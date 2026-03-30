import "../assets/chat.css";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";

/* ================================
TIPOS
================================ */

type TipoMensagem = "bot" | "user";

interface Mensagem {
  tipo: TipoMensagem;
  texto: string;
}

interface Respostas {
  [key: string]: string;
}

type Campo =
  | { label: string; name: string; type: "text" | "date" | "number" }
  | {
      label: string;
      name: string;
      type: "select";
      options: string[];
    }
  | { label: string; name: string; type: "textarea" };

type Fluxo = {
  title: string;
  perguntas: Campo[];
};

/* ================================
FLUXOS (TIPADO)
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
      { label: "Descreva brevemente:", name: "descricao", type: "textarea" },
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
      { label: "Quantidade de vídeos:", name: "quantidade", type: "number" },
      { label: "Descreva brevemente:", name: "descricao", type: "textarea" },
    ],
  },
  Aereo: {
    title: "Vídeo Aéreo",
    perguntas: [
      { label: "Local:", name: "local", type: "text" },
      { label: "Data:", name: "data", type: "date" },
      {
        label: "Área:",
        name: "area",
        type: "select",
        options: ["Urbana", "Rural"],
      },
      { label: "Descreva brevemente:", name: "descricao", type: "textarea" },
    ],
  },
  evento: {
    title: "Evento",
    perguntas: [
      {
        label: "Tipo de evento:",
        name: "tipo",
        type: "select",
        options: ["Aniversário", "Formatura", "Corporativo", "Esportivo"],
      },
      { label: "Data:", name: "data", type: "date" },
      { label: "Duração (horas):", name: "duracao", type: "number" },
      { label: "Descreva brevemente:", name: "descricao", type: "textarea" },
    ],
  },
} satisfies Record<string, Fluxo>;

type TipoServico = keyof typeof fluxos;

/* ================================
COMPONENTE MEMO
================================ */

const Message = memo(({ tipo, texto }: Mensagem) => {
  return <div className={`msg ${tipo}`}>{texto}</div>;
});

/* ================================
COMPONENTE PRINCIPAL
================================ */

export default function Chat() {
  const [active, setActive] = useState(false);
  const [servico, setServico] = useState<TipoServico | null>(null);
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);

  const mensagensRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const resetChat = useCallback(() => {
    setServico(null);
    setPasso(0);
    setRespostas({});
    setMensagens([]);
  }, []);

  const toggleMenu = useCallback(() => {
    if (active) resetChat();
    setActive((prev) => !prev);
  }, [active, resetChat]);

  const botMsg = useCallback((texto: string) => {
    setMensagens((prev) => [...prev, { tipo: "bot", texto }]);
  }, []);

  const userMsg = useCallback((texto: string) => {
    setMensagens((prev) => [...prev, { tipo: "user", texto }]);
  }, []);

  function formatarData(data: string) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  const selecionarServico = useCallback(
    (valor: TipoServico) => {
      setServico(valor);
      userMsg(fluxos[valor].title);
      setPasso(0);
    },
    [userMsg],
  );

  useEffect(() => {
    if (!servico) return;

    const perguntas = fluxos[servico].perguntas;

    if (passo < perguntas.length) {
      botMsg(perguntas[passo].label);
    } else {
      finalizar();
    }
  }, [passo, servico, botMsg]);

  const enviarResposta = useCallback(() => {
    if (!servico) return;

    const valor = inputRef.current?.value;
    if (!valor) return;

    const pergunta = fluxos[servico].perguntas[passo];

    setRespostas((prev) => ({
      ...prev,
      [pergunta.label]: valor,
    }));

    userMsg(valor);
    if (inputRef.current) inputRef.current.value = "";

    setPasso((prev) => prev + 1);
  }, [servico, passo, userMsg]);

  const finalizar = useCallback(() => {
    if (!servico) return;

    const numero = "558799742168";

    let texto = "Olá! Quero contratar um serviço Saints:%0A";
    texto += `%0AServiço: ${fluxos[servico].title}%0A`;

    for (const k in respostas) {
      let valor = respostas[k];
      if (k.toLowerCase().includes("data")) {
        valor = formatarData(valor);
      }
      texto += `${k} ${valor}%0A`;
    }

    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
  }, [respostas, servico]);

  useEffect(() => {
    if (!active) return;

    botMsg("Olá! Bem-vindo ao atendimento Saints.");
    botMsg("Qual serviço você deseja contratar?");
  }, [active, botMsg]);

  useEffect(() => {
    mensagensRef.current?.scrollTo({
      top: mensagensRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensagens]);

  const renderInput = () => {
    if (!servico) return null;

    const campo = fluxos[servico].perguntas[passo];
    if (!campo) return null;

    if (campo.type === "select") {
      return (
        <select ref={selectRef}>
          <option value="">Selecione</option>
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
      <motion.button
        className="chat-toggle"
        onClick={toggleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="p-in-chat-toggle">atendimento</p>
      </motion.button>

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
            <div className="chat-header">
              <span className="span-in-chat">Saints Atendimento</span>
              <div className="chat-actions">
                <button onClick={() => window.location.reload()}>↺</button>
                <button onClick={toggleMenu}>✕</button>
              </div>
            </div>

            <div className="mensagens" ref={mensagensRef}>
              {mensagens.map((m, i) => (
                <Message key={i} tipo={m.tipo} texto={m.texto} />
              ))}
            </div>

            <div className="input-area">
              {!servico ? (
                <select
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    selecionarServico(e.target.value as TipoServico)
                  }
                >
                  <option value="">Selecione</option>
                  {(Object.entries(fluxos) as [TipoServico, Fluxo][]).map(
                    ([key, fluxo]) => (
                      <option key={key} value={key}>
                        {fluxo.title}
                      </option>
                    ),
                  )}
                </select>
              ) : passo < fluxos[servico].perguntas.length ? (
                <>
                  {renderInput()}
                  <button onClick={enviarResposta}>Enviar</button>
                </>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
