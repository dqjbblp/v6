import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import mp3 from "../assets/566385765.mp3"

const CanSeeMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isInit, toggleInit] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [arr, setArr] = useState<Uint8Array>();
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const audioCtx = useMemo(() => new AudioContext(), []);

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef]);

  useEffect(() => {
    if (audioRef.current) {
      const newAnalyser = audioCtx.createAnalyser();
      const sourceNode = audioCtx.createMediaElementSource(audioRef.current);
      sourceNode.connect(newAnalyser);
      newAnalyser.connect(audioCtx.destination);
      newAnalyser.fftSize = 512;

      setAnalyser(newAnalyser);
      setArr(new Uint8Array(newAnalyser.frequencyBinCount));
    }
  }, [audioCtx]);

  const audioPlay = useCallback(() => {
    if (isInit) {
      return;
    }

    if (analyser) {
      audioCtx.resume();
      toggleInit(true);
    }
  }, [isInit, analyser, audioCtx]);

  const draw = useCallback(() => {
    if (!isInit || !analyser || !arr || !ctx) return;

    const renderFrame = () => {
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(arr);
      ctx.clearRect(0, 0, 1900, 400);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      arr.forEach((value, index) => {
        const barHeight = value;
        const barWidth = (1900 / arr.length) * 2;
        const x = index * barWidth;
        ctx.fillRect(x, 400 - barHeight, barWidth, barHeight);
      });
    };

    renderFrame();
  }, [isInit, analyser, arr, ctx]);

  useEffect(() => {
    if (arr) {
      draw();
    }
  }, [arr, draw]);

  return (
    <div className={'flex flex-col gap-4 items-center mt-8'}>
      <canvas ref={canvasRef} width={1900} height={400} style={{ border: '2px dashed #cccccc', borderRadius: 10 }}></canvas>
      <audio ref={audioRef} onPlay={audioPlay} src={mp3} controls />
    </div>
  );
};

export default CanSeeMusic;
