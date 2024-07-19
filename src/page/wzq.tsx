import { useCallback, useMemo, useState } from "react";
import { useToggle } from "react-use";

const Wzq = () => {
  const [over, isOver] = useState(false);
  const [isWhite, setIsWhite] = useToggle(true);

  const list = useMemo(() => {
    isOver(false);
    setIsWhite(true)
    const rows = 10;
    const cols = 10;
    return Array.from({ length: rows }, () => Array(cols).fill(""));
  }, [over]);


  const mouseDown = (e: any) => {
    const id = e.target.id.split("");
    if (list[id[0]][id[1]]) return;
    list[id[0]][id[1]] = isWhite;
    setIsWhite(!isWhite);
  };

  const gameover = useCallback(() => {
    const reg1 = /(true\s*){5}/;
    const reg2 = /(false\s*){5}/;

    for (const row of list) {
      const ls = row.join(" ");
      if (reg1.test(ls) || reg2.test(ls)) return isOver(true);
    }

    // Check columns
    for (let i = 0; i < 10; i++) {
      let col = "";
      for (let j = 0; j < 10; j++) {
        col += list[j][i] + " ";
      }
      if (reg1.test(col) || reg2.test(col)) return isOver(true);
    }

    // Check diagonals
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 5; j++) {
        let diag1 = "",
          diag2 = "",
          diag3 = "",
          diag4 = "";
        for (let k = 0; k < 5; k++) {
          diag1 += list[i + k][j + k] + " ";
          diag2 += list[i + k][j + 4 - k] + " ";
          diag3 += list[j + k][i + k] + " ";
          diag4 += list[j + k][i + 4 - k] + " ";
        }
        if (
          reg1.test(diag1) ||
          reg2.test(diag1) ||
          reg1.test(diag2) ||
          reg2.test(diag2) ||
          reg1.test(diag3) ||
          reg2.test(diag3) ||
          reg1.test(diag4) ||
          reg2.test(diag4)
        ) {
          return isOver(true);
        }
      }
    }

    return false;
  }, [list]);

  gameover();

  return (
    <div className={"min-h-dvh flex flex-col gap-10 m-10 bg-slate-500 items-center justify-center"}>
      {list.map((item, index) => {
        return (
          <div
            className={"w-[422px] h-1 bg-orange-600 flex justify-between"}
            key={index}
          >
            {item.map((item2, index2) => {
              return (
                <div
                  style={{ height: index === list.length - 1 ? "0px" : "44px" }}
                  key={index2}
                  className={`relative w-1 bg-purple-600`}
                >
                  <div
                    onMouseDown={mouseDown}
                    className={
                      "absolute top-[2px] left-[2px] size-3 -translate-x-1/2 -translate-y-1/2 opacity-0 bg-transparent"
                    }
                    id={`${index}` + `${index2}`}
                  />
                  <div
                    className={`absolute top-[2px] left-[2px] size-3 -translate-x-1/2 -translate-y-1/2 transition-all scale-x-0 rounded-md ${
                      item2 && "scale-x-100 bg-black"
                    }`}
                  />
                  <div
                    className={
                      `absolute top-[2px] left-[2px] size-3 -translate-x-1/2 -translate-y-1/2 transition-all scale-x-0 rounded-md ${!item2 && item2 !== "" &&"scale-x-100 bg-white"}`
                    }
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Wzq;
