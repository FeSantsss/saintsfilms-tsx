import "../assets/chat.css";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";

/* ================================
  TIPOS
  Define as estruturas de dados usadas ao longo do componente.
================================ */

// Identifica se uma mensagem foi enviada pelo bot ou pelo usuario.
type TipoMensagem = "bot" | "user";

// Estrutura de uma mensagem exibida no chat.
interface Mensagem {
  tipo: TipoMensagem;
  texto: string;
}

// Armazena as respostas do usuario indexadas pelo label de cada pergunta.
interface Respostas {
  [key: string]: string;
}

// Um campo pode ser de entrada simples, select com opcoes ou textarea.
type Campo =
  | { label: string; name: string; type: "text" | "date" | "number" }
  | { label: string; name: string; type: "select"; options: string[] }
  | { label: string; name: string; type: "textarea" };

// Estrutura de um fluxo de atendimento: titulo e lista de perguntas.
type Fluxo = {
  title: string;
  perguntas: Campo[];
};

/* ================================
  FLUXOS
  Cada chave representa um servico disponivel para contratacao.
  Cada fluxo define o titulo exibido e as perguntas a serem feitas em sequencia.
================================ */

const fluxos = {
  casamento: {
    title: "Casamento",
    perguntas: [
      { label: "Data do casamento:", name: "data", type: "date" },
      {
        label: "Formato:",
        name: "formato",
        type: "select",
        options: ["Cerimônia", "Festa", "Ambos"],
      },
      { label: "Convidados:", name: "convidados", type: "number" },
      { label: "Descreva brevemente:", name: "descrição", type: "textarea" },
    ],
  },
  reels: {
    title: "Reels para Redes Sociais",
    perguntas: [
      { label: "Nome da marca:", name: "marca", type: "text" },
      {
        label: "Objetivo:",
        name: "objetivo",
        type: "select",
        options: ["Engajamento", "Vendas", "Autoridade"],
      },
      { label: "Quantidade de videos:", name: "quantidade", type: "number" },
      { label: "Descreva brevemente:", name: "descrição", type: "textarea" },
    ],
  },
  Aereo: {
    title: "Video Aéreo",
    perguntas: [
      { label: "Local:", name: "local", type: "text" },
      { label: "Data:", name: "data", type: "date" },
      {
        label: "Área:",
        name: "área",
        type: "select",
        options: ["Urbana", "Rural"],
      },
      { label: "Descreva brevemente:", name: "descrição", type: "textarea" },
    ],
  },
  evento: {
    title: "Evento",
    perguntas: [
      {
        label: "Tipo de evento:",
        name: "tipo",
        type: "select",
        options: ["Aniversario", "Formatura", "Corporativo", "Esportivo"],
      },
      { label: "Data:", name: "data", type: "date" },
      { label: "Duração (horas):", name: "duração", type: "number" },
      { label: "Descreva brevemente:", name: "descrição", type: "textarea" },
    ],
  },
} satisfies Record<string, Fluxo>;

// Tipo derivado das chaves do objeto fluxos, garante tipagem segura ao selecionar servico.
type TipoServico = keyof typeof fluxos;

/* ================================
  COMPONENTE MESSAGE
  Renderiza uma unica mensagem no historico do chat.
  Usa memo para evitar re-renderizacoes desnecessarias quando o historico cresce.
================================ */

const Message = memo(({ tipo, texto }: Mensagem) => {
  return <div className={`msg ${tipo}`}>{texto}</div>;
});

/* ================================
  HELPERS
  Funcoes utilitarias puras, sem efeitos colaterais.
================================ */

// Converte uma data no formato ISO (AAAA-MM-DD) para o formato brasileiro (DD/MM/AAAA).
function formatarData(data: string) {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Aplica formatacao especifica ao valor conforme o label da pergunta.
// Atualmente formata datas; outros casos retornam o valor sem alteracao.
function formatarValor(label: string, valor: string) {
  if (label.toLowerCase().includes("data")) return formatarData(valor);
  return valor;
}

/* ================================
  COMPONENTE PRINCIPAL
================================ */

export default function Chat() {
  // Controla se o chat esta visivel ou nao.
  const [active, setActive] = useState(false);

  // Servico selecionado pelo usuario; null enquanto nenhum foi escolhido.
  const [servico, setServico] = useState<TipoServico | null>(null);

  // Indice da pergunta atual dentro do fluxo selecionado.
  const [passo, setPasso] = useState(0);

  // Acumula as respostas do usuario durante o fluxo.
  const [respostas, setRespostas] = useState<Respostas>({});

  // Historico de mensagens exibidas no chat.
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);

  // Indica que o fluxo foi concluido; oculta os inputs e impede novas interacoes.
  const [finalizado, setFinalizado] = useState(false);

  // Contador de sessao: incrementado a cada reset para forcar o disparo
  // do useEffect de saudacao mesmo quando o chat ja estava aberto.
  // Sem ele, o efeito nao rodaria novamente pois `active` nao muda no reinicio.
  const [sessao, setSessao] = useState(0);

  // Referencia ao container de mensagens para rolar ate o final automaticamente.
  const mensagensRef = useRef<HTMLDivElement | null>(null);

  // Referencias aos campos de entrada; cada tipo de campo usa a sua propria ref.
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  // Reinicia todos os estados do chat para os valores iniciais
  // e incrementa a sessao para disparar novamente as mensagens de saudacao.
  const resetChat = useCallback(() => {
    setServico(null);
    setPasso(0);
    setRespostas({});
    setMensagens([]);
    setFinalizado(false);
    setSessao((prev) => prev + 1);
  }, []);

  // Alterna a visibilidade do chat.
  // Ao fechar, tambem reinicia o estado para uma proxima abertura limpa.
  const toggleMenu = useCallback(() => {
    if (active) resetChat();
    setActive((prev) => !prev);
  }, [active, resetChat]);

  // Adiciona uma mensagem do bot ao historico.
  const botMsg = useCallback((texto: string) => {
    setMensagens((prev) => [...prev, { tipo: "bot", texto }]);
  }, []);

  // Adiciona uma mensagem do usuario ao historico.
  const userMsg = useCallback((texto: string) => {
    setMensagens((prev) => [...prev, { tipo: "user", texto }]);
  }, []);

  // Registra o servico escolhido e exibe o nome dele como mensagem do usuario.
  // Reinicia o passo para 0 para comecar o fluxo desde a primeira pergunta.
  const selecionarServico = useCallback(
    (valor: TipoServico) => {
      setServico(valor);
      userMsg(fluxos[valor].title);
      setPasso(0);
    },
    [userMsg],
  );

  // Exibe as mensagens de saudacao sempre que o chat e aberto ou reiniciado.
  // Depende de `active` e `sessao`: active garante que o chat esta visivel,
  // sessao muda a cada reset e forca o efeito a rodar novamente sem fechar o chat.
  useEffect(() => {
    if (!active) return;
    botMsg("Olá! Bem-vindo ao atendimento Saints.");
    botMsg("Qual serviço você deseja contratar?");
  }, [active, sessao]);

  // Exibe a pergunta correspondente ao passo atual do fluxo selecionado.
  // Roda sempre que o passo avanca ou quando um novo servico e escolhido.
  useEffect(() => {
    if (!servico) return;
    const perguntas = fluxos[servico].perguntas;
    if (passo < perguntas.length) {
      botMsg(perguntas[passo].label);
    }
  }, [passo, servico]);

  // Rola o container de mensagens ate o final sempre que uma nova mensagem e adicionada.
  useEffect(() => {
    mensagensRef.current?.scrollTo({
      top: mensagensRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensagens]);

  // Coleta o valor do campo atual, registra a resposta e avanca para o proximo passo.
  // Se for o ultimo passo, chama a finalizacao passando as respostas ja atualizadas
  // para evitar problemas de closure com o estado assincrono do React.
  const enviarResposta = useCallback(() => {
    if (!servico) return;

    const campo = fluxos[servico].perguntas[passo];
    if (!campo) return;

    // Le o valor da ref correta de acordo com o tipo do campo.
    let valor = "";
    if (campo.type === "select") {
      valor = selectRef.current?.value ?? "";
    } else if (campo.type === "textarea") {
      valor = textareaRef.current?.value ?? "";
    } else {
      valor = inputRef.current?.value ?? "";
    }

    // Nao prossegue se o campo estiver vazio.
    if (!valor) return;

    // Cria o objeto de respostas atualizado localmente antes do setState
    // para que finalizarComRespostas receba o conjunto completo sem depender
    // do estado que ainda nao foi atualizado neste ciclo de renderizacao.
    const novasRespostas = {
      ...respostas,
      [campo.label]: valor,
    };

    setRespostas(novasRespostas);

    // Exibe o valor formatado na bolha de mensagem do usuario.
    userMsg(formatarValor(campo.label, valor));

    // Limpa todos os campos de entrada apos o envio.
    if (inputRef.current) inputRef.current.value = "";
    if (textareaRef.current) textareaRef.current.value = "";
    if (selectRef.current) selectRef.current.value = "";

    const proximoPasso = passo + 1;
    const totalPerguntas = fluxos[servico].perguntas.length;

    if (proximoPasso >= totalPerguntas) {
      // Ultimo passo: encerra o fluxo com as respostas finais ja consolidadas.
      finalizarComRespostas(servico, novasRespostas);
    } else {
      // Avanca para a proxima pergunta.
      setPasso(proximoPasso);
    }
  }, [servico, passo, respostas, userMsg]);

  // Encerra o fluxo, exibe mensagem de redirecionamento e abre o WhatsApp
  // com o resumo do pedido montado a partir das respostas coletadas.
  const finalizarComRespostas = useCallback(
    (servicoAtual: TipoServico, respostasFinais: Respostas) => {
      setFinalizado(true);
      botMsg("Otimo! Redirecionando para o WhatsApp...");

      const numero = "558799742168";

      // Monta o texto da mensagem pre-preenchida para o WhatsApp.
      let texto = "Olá! Quero contratar um serviço Saints:%0A";
      texto += `%0AServiço: ${fluxos[servicoAtual].title}%0A`;

      for (const k in respostasFinais) {
        const valor = formatarValor(k, respostasFinais[k]);
        texto += `${k} ${valor}%0A`;
      }

      // Pequeno atraso para que a mensagem do bot seja exibida antes da abertura do WhatsApp.
      setTimeout(() => {
        window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
      }, 800);
    },
    [botMsg],
  );

  // Renderiza o campo de entrada adequado para o passo atual do fluxo.
  // Retorna null se o fluxo estiver encerrado ou nao houver campo disponivel.
  const renderInput = () => {
    if (!servico || finalizado) return null;

    const campo = fluxos[servico].perguntas[passo];
    if (!campo) return null;

    if (campo.type === "select") {
      return (
        <select ref={selectRef} defaultValue="">
          <option value="" disabled>
            Selecione
          </option>
          {campo.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (campo.type === "textarea") {
      return <textarea ref={textareaRef} />;
    }

    return <input type={campo.type} ref={inputRef} />;
  };

  return (
    <>
      {/* Botao fixo que abre e fecha o chat. */}
      <motion.button
        className="chat-toggle"
        onClick={toggleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="p-in-chat-toggle">atendimento</p>
      </motion.button>

      {/* AnimatePresence gerencia a animacao de entrada e saida do painel do chat. */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="chat"
            className="chat-atendimento open"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Cabecalho com titulo e botoes de reiniciar e fechar. */}
            <div className="chat-header">
              <span className="span-in-chat">Saints Atendimento</span>
              <div className="chat-actions">
                {/* Reinicia o fluxo sem fechar o chat; as mensagens de saudacao aparecem novamente. */}
                <button onClick={resetChat}>&#8635;</button>
                {/* Fecha o chat e reinicia o estado. */}
                <button onClick={toggleMenu}>&#10005;</button>
              </div>
            </div>

            {/* Area de historico de mensagens com scroll automatico. */}
            <div className="mensagens" ref={mensagensRef}>
              {mensagens.map((m, i) => (
                <Message key={i} tipo={m.tipo} texto={m.texto} />
              ))}
            </div>

            {/* Area de entrada: exibe o select de servicos, os campos do fluxo ou nada ao finalizar. */}
            <div className="input-area">
              {
                !servico ? (
                  // Exibe o selector de servicos enquanto nenhum foi escolhido.
                  <select
                    defaultValue=""
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      if (e.target.value)
                        selecionarServico(e.target.value as TipoServico);
                    }}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {(Object.entries(fluxos) as [TipoServico, Fluxo][]).map(
                      ([key, fluxo]) => (
                        <option key={key} value={key}>
                          {fluxo.title}
                        </option>
                      ),
                    )}
                  </select>
                ) : !finalizado ? (
                  // Exibe o campo atual do fluxo e o botao de envio.
                  <>
                    {renderInput()}
                    <button onClick={enviarResposta}>Enviar</button>
                  </>
                ) : null /* Fluxo encerrado: nenhum campo exibido. */
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
