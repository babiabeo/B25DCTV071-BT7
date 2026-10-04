import { useState } from "react";
import "./App.css";

import Button from "./components/Button";
import Display from "./components/Display";

interface CalButton {
  tag: string;
  action: "DEL" | "CLR" | "PERCENT" | "OP" | "DIGIT" | "SIGN" | "DOT" | "EXEC";
  color?: string;
}

const BUTTONS: CalButton[] = [
  { tag: "DEL", action: "DEL", color: "#ffa07a" },
  { tag: "CLR", action: "CLR", color: "#ffa07a" },
  { tag: "%", action: "PERCENT" },
  { tag: "÷", action: "OP" },
  { tag: "7", action: "DIGIT" },
  { tag: "8", action: "DIGIT" },
  { tag: "9", action: "DIGIT" },
  { tag: "×", action: "OP" },
  { tag: "4", action: "DIGIT" },
  { tag: "5", action: "DIGIT" },
  { tag: "6", action: "DIGIT" },
  { tag: "-", action: "OP" },
  { tag: "1", action: "DIGIT" },
  { tag: "2", action: "DIGIT" },
  { tag: "3", action: "DIGIT" },
  { tag: "+", action: "OP" },
  { tag: "±", action: "SIGN" },
  { tag: "0", action: "DIGIT" },
  { tag: "•", action: "DOT" },
  { tag: "=", action: "EXEC", color: "#90ee90" },
];

const OP = new Set(["÷", "×", "-", "+"]);

export default function App() {
  const [topLine, setTopLine] = useState("");
  const [bottomLine, setBottomLine] = useState("0");
  const [hasDot, setHasDot] = useState(false);
  const [isExecuted, setExecuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const addChar = (char: string) => {
    setBottomLine((prev) => prev + char);
  };

  const clearCal = (defaultInput = "0") => {
    setTopLine("");
    setBottomLine(defaultInput);
    setHasDot(false);
    setExecuted(false);
    setHasError(false);
  };

  const newCal = () => {
    if (!isExecuted) return;
    if (hasError) {
      clearCal();
    } else {
      setTopLine("");
      setExecuted(false);
    }
  };

  const resetCal = (defaultInput?: string) => {
    if (isExecuted) clearCal(defaultInput);
  };

  const deleteCal = () => {
    if (!isExecuted) {
      const newStr = bottomLine.slice(0, -1);
      setBottomLine(newStr.length === 0 ? "0" : newStr);
    }
  };

  const replaceOp = (op: string) => {
    switch (op) {
      case "%":
        return "/100 ";
      case "÷":
        return "/";
      case "×":
        return "*";
      default:
        return op;
    }
  };

  const handleButton = (btn: CalButton) => {
    switch (btn.action) {
      case "DEL":
        deleteCal();
        break;
      case "CLR":
        clearCal();
        break;
      case "PERCENT": {
        newCal();
        addChar("%");
        break;
      }
      case "OP": {
        newCal();

        if (OP.has(bottomLine.slice(-1))) {
          setBottomLine(bottomLine.slice(0, -1) + btn.tag);
        } else {
          addChar(btn.tag);
        }

        setHasDot(false);
        break;
      }
      case "DIGIT": {
        resetCal("");

        if (bottomLine === "0") {
          setBottomLine(btn.tag);
        } else {
          addChar(btn.tag);
        }
        break;
      }
      case "SIGN": {
        newCal();

        const negatedPattern = /\(-(\d+(\.\d+)?)\)$/;
        if (negatedPattern.test(bottomLine)) {
          setBottomLine(bottomLine.replace(negatedPattern, "$1"));
          return;
        }

        const positivePattern = /(\d+(\.\d+)?)$/;
        if (positivePattern.test(bottomLine)) {
          setBottomLine(bottomLine.replace(positivePattern, "(-$1)"));
          return;
        }
        break;
      }
      case "DOT": {
        resetCal();

        if (!hasDot) {
          addChar(".");
          setHasDot(true);
        }
        break;
      }
      case "EXEC": {
        let out = "";
        try {
          const expr = bottomLine
            .replace(/[%÷×-]/g, replaceOp)
            .replace(/(\d)\(/g, "$1*(")
            .replace(/\)(\d)/g, ")*$1")
            .replace(/\)\(/g, ")*(");

          let result: number = new Function(`return (${expr})`)();
          if (!Number.isFinite(result)) {
            throw new Error();
          }

          result = Math.round(result * 1e14) / 1e14;
          const resultStr = result.toString();

          out =
            resultStr.length > 14
              ? result
                  .toExponential(14)
                  .replace(/\.?0+e/, "e")
                  .replace("e+", "e")
              : resultStr;
        } catch (error) {
          setHasError(true);
          if (error instanceof SyntaxError) {
            out = "Syntax ERROR";
          } else {
            out = "Math ERROR";
          }
        }

        setTopLine(bottomLine);
        setBottomLine(out);
        setExecuted(true);
        break;
      }
    }
  };

  return (
    <div className="cal-body">
      <Display topLine={topLine} bottomLine={bottomLine} />
      <div className="grid-btn">
        {BUTTONS.map((btn, i) => (
          <Button
            key={`btn_${i}`}
            tag={btn.tag}
            color={btn.color ?? "#f5f5f5"}
            onClick={() => handleButton(btn)}
          />
        ))}
      </div>
    </div>
  );
}
