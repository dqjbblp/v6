import { Button } from "antd";
import { MouseEvent, useEffect, useRef } from "react";
import "./dialog.css";
import { useAppDispatch, useAppSelector } from "../store/selfHook";
import { closeDia } from "../store/dialog";

const DiaLog = () => {
  const logRef = useRef<HTMLDialogElement>(null);

  const show = useAppSelector((state) => state.dialog.dialogShow);
  const desc = useAppSelector((state) => state.dialog.desc);
  const title = useAppSelector((state) => state.dialog.title);

  const dispatch = useAppDispatch();

  const close = () => {
    logRef?.current?.close();
    dispatch(closeDia());
    document.body.removeAttribute("style");
  };

  const maskClose = (e: MouseEvent) => {
    const ele = e.target as HTMLElement;
    if (ele.className === "dia") {
      close();
    }
  };

  useEffect(() => {
    if (show) {
      logRef.current?.showModal();
      document.body.style.overflow = "hidden";
    }
  }, [show]);

  return (
    <div>
      <dialog
        onClick={maskClose}
        className="dia"
        ref={logRef}
        style={{
          width: "200px",
          height: "200px",
          border: "none",
          position: "fixed",
          left:'50%',
          top:'100%',
          transform: "translate(-50%, -100%)",
        }}
      >
        <div
          className="diaSon"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent:'space-between',
            alignItems:'center',
            padding:12,
            boxSizing:'border-box'
          }}
        >
          <div style={{display:'flex',flexDirection:'column',gap:8,textAlign:'center'}}>
            <h3>{title}</h3>
            <div>{desc}</div>
          </div>
          <Button style={{width:100}} onClick={close}>关闭弹窗</Button>
        </div>
      </dialog>
    </div>
  );
};

export default DiaLog;
