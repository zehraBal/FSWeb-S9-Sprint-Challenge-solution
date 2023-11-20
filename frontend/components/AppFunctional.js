import React, { useState } from "react";
import axios from "axios";
// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  function getXY() {
    const coordinates = [
      "(1, 1)",
      "(2, 1)",
      "(3, 1)",
      "(1, 2)",
      "(2, 2)",
      "(3, 2)",
      "(1, 3)",
      "(2, 3)",
      "(3, 3)",
    ];
    return coordinates[index];
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
  }

  function sonrakiIndex(targetIndex) {
    // sadece gidebiliyorsam çalışıyor
    setIndex(targetIndex);
    setMessage(initialMessage);
    setSteps(steps + 1);
  }

  function ilerle(evt) {
    console.log("ilerle", evt.target.id);

    switch (evt.target.id) {
      case "up":
        if (index < 3) {
          // yukarı gitme
          setMessage("Yukarıya gidemezsiniz");
          break;
        }
        // yukarı git
        sonrakiIndex(index - 3);
        break;
      case "down":
        if (index >= 6) {
          // yukarı gitme
          setMessage("Aşağıya gidemezsiniz");
          break;
        }
        // aşağı git
        sonrakiIndex(index + 3);
        break;
      case "left":
        if (index % 3 === 0) {
          setMessage("Sola gidemezsiniz");
          // Sola gitme
          break;
        }
        // sola git
        sonrakiIndex(index - 1);
        break;
      case "right":
        if (index % 3 === 2) {
          // Sağa gitme
          setMessage("Sağa gidemezsiniz");
          break;
        }
        // sağa git
        sonrakiIndex(index + 1);
        break;
      default:
        break;
    }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    axios
      .post("http://localhost:9000/api/result", {
        x: getXY()[1],
        y: getXY()[4],
        steps: steps,
        email: email,
      })
      .then(function (response) {
        console.log(response);
        setMessage(response.data.message);
        setEmail(initialEmail);
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.response.data.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={ilerle} id="left">
          SOL
        </button>
        <button onClick={ilerle} id="up">
          YUKARI
        </button>
        <button onClick={ilerle} id="right">
          SAĞ
        </button>
        <button onClick={ilerle} id="down">
          AŞAĞI
        </button>
        <button id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={onChange}
          id="email"
          type="email"
          placeholder="email girin"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
