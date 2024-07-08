import { Button } from "antd";
import { useEffect, useRef, useState } from "react";

interface Window {
  showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>;
}

const Sign = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let isClick = false;
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [file,setFile] = useState<any>()

  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef]);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
    }
  }, [color, ctx]);

  const canvasDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isClick = true;
    ctx?.beginPath();
    ctx?.moveTo(
      e.pageX - canvasRef.current!.offsetLeft,
      e.pageY - canvasRef.current!.offsetTop
    );
  };

  const canvasMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isClick) {
      ctx?.lineTo(
        e.pageX - canvasRef.current!.offsetLeft,
        e.pageY - canvasRef.current!.offsetTop
      );
      ctx?.stroke();
    }
  };

  const canvasUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isClick = false;
    ctx?.closePath();
  };

  const clearAll = () => {
    ctx?.clearRect(0, 0, 1200, 400);
  };

  const logOut = () => {
    const url = canvasRef.current?.toDataURL("image/png") as string;
    const a = document.createElement("a");
    a.href = url;
    a.download = "myCanvas.png";
    a.click();
  };

  const fileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    
    const fileObj = e.target.files![0]
    
    const render = new FileReader()
    render.onload = (e) => {
      setFile(e.target?.result)
    }
    render.readAsText(fileObj)
  }

  return (
    <div>
      <div className={'flex'}>
        <canvas
          onMouseDown={canvasDown}
          onMouseMove={canvasMove}
          onMouseUp={canvasUp}
          style={{ border: "1px dashed #cccccc", borderRadius: "8px" }}
          width={1200}
          height={400}
          ref={canvasRef}
        ></canvas>
        <div className={'flex-1 border border-dashed border-orange-600'} dangerouslySetInnerHTML={{
          __html:file
        }}></div>
      </div>
      <Button onClick={clearAll}>清空</Button>
      <Button onClick={logOut}>导出</Button>
      <input
        type="color"
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />
      <input type="file" onChange={fileChange} />
    </div>
  );
};

export default Sign;
