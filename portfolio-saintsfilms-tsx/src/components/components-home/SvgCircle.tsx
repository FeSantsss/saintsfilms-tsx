const SvgCircle = () => {
  return (
    <svg viewBox="0 0 200 200" className="circle">
      <defs>
        <path
          id="circlePath"
          d="M 100, 100
                    m -75, 0
                    a 75,75 0 1,1 150,0
                    a 75,75 0 1,1 -150,0"
        />
      </defs>

      <text>
        <textPath href="#circlePath">
          não entregamos vídeos • construímos presença •
        </textPath>
      </text>
    </svg>
  );
};

export default SvgCircle;
