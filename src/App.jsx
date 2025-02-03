import { useState } from "react";
import JSConfetti from 'js-confetti'

function App() {
  const jsConfetti = new JSConfetti()
  const [randomValor, setRandomValor] = useState({})
  const [imagenCargada, setImagenCargada] = useState(false);
  const [agrandar, setAgrandar] = useState(45)
  const [valueSi, setValueSi] = useState(false)
  const [intentos, setIntentos] = useState(0)

  // Reemplaza esta URL con tu webhook de Discord
  const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL

  const notificarRespuesta = async (aceptoAlPrimero) => {
    try {
      const mensaje = aceptoAlPrimero 
        ? "¡Aceptó al primer intento! 🥳❤️" 
        : `Aceptó después de ${intentos} intentos 💕`

      const data = {
        content: mensaje,
        // Puedes personalizar el nombre y avatar del bot
        username: "Bot San Valentín",
        avatar_url: "https://i.imgur.com/4M34hi2.png"
      }

      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.error("Error al enviar notificación:", error)
    }
  }

  let random = [{
    id: 1,
    description: "Di si por favor",
    img: "https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif"
  },
  {
    id: 1,
    description: "Piénsalo de nuevo.",
    img: "https://i.pinimg.com/originals/77/6b/21/776b215bed3deeef47fd3aa657685a18.gif"
  }
    ,
  {
    id: 2,
    description: "Vamos, atrévete a decir que sí.",
    img: "https://www.gifmaniacos.es/wp-content/uploads/2019/05/gatitos-kawaii-gifmaniacos.es-19.gif"
  },
  {
    id: 3,
    description: "No tengas miedo, será genial.",
    img: "https://i.pinimg.com/originals/e1/c3/88/e1c388133e0f998e25bb17c837b74a14.gif"
  },
  {
    id: 4,
    description: "Confía en mí, será divertido.",
    img: "https://media.tenor.com/Bn88VELdNI8AAAAi/peach-goma.gif"
  },
  {
    id: 5,
    description: "No tengas dudas, te hará sonreír.",
    img: "https://i.pinimg.com/originals/c6/b3/0d/c6b30d1a2dc178aeb92de63295d4ae64.gif"
  },
  {
    id: 6,
    description: "Te prometo que será inolvidable.",
    img: "https://media.tenor.com/N2oqtqaB_G0AAAAi/peach-goma.gif"
  },
  {
    id: 7,
    description: "No dejes que el miedo te detenga.",
    img: "https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif"
  },
  {
    id: 8,
    description: "Confía en el destino, nos está dando una señal.",
    img: "https://media.tenor.com/cbEccaK9QxMAAAAi/peach-goma.gif"
  },
  {
    id: 9,
    description: "Confía en mí.",
    img: "https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif"
  },
  {
    id: 10,
    description: "No te arrepentirás.",
    img: "https://media.tenor.com/I7KdFaMzUq4AAAAi/peach-goma.gif"
  }]

 
  const randomResponse = () => {
    let index = Math.floor(Math.random() * 11);
    console.log(random[index])
    if (agrandar <= 500) {
      setAgrandar(agrandar + 10)
    }
    setRandomValor(random[index]);
    setIntentos(prev => prev + 1); // Incrementamos el contador de intentos
  }

  const handleImageLoad = () => {
    setImagenCargada(true);
  }


  // Aquí está la función handleSi que faltaba
  const handleSi = async () => {
    setValueSi(true)
    jsConfetti.addConfetti({
      emojis: ['😍', '🥰', '❤️', '😘'],
      emojiSize: 70,
      confettiNumber: 80,
    })
    
    // Notificar la respuesta a Discord
    await notificarRespuesta(intentos === 0)
  }

  return (
    <main id="canvas" className="fondo w-screen h-screen bg-no-repeat bg-cover flex items-center justify-center bg-center">
      {!valueSi ? (
        <div className="p-5">
          <h1 className="text-white font-bold text-5xl text-center">¿Quieres ser mi San Valentin?</h1>
          <img 
            src={Object.keys(randomValor).length === 0 
              ? "https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif" 
              : randomValor.img} 
            alt="San Valentin" 
            className="mx-auto" 
            width={400} 
            height={400} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5 items-center">
            <button 
              onClick={handleSi} 
              className={`bg-green-500 text-white font-bold p-2 rounded-md text-xl h-${agrandar}`} 
              style={{ height: agrandar }}
            >
              Si
            </button>
            <button
              className="bg-red-500 text-white font-bold p-2 rounded-md text-xl"
              onClick={randomResponse}
              disabled={imagenCargada}
            >
              {Object.keys(randomValor).length === 0 ? "No" : randomValor.description}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-10">
          <h1 className="text-4xl text-white font-bold">
            {intentos === 0 
              ? "¡Sabía que dirías que sí a la primera! ❤️" 
              : "¡Sabía que al final dirías que sí! ❤️"}
          </h1>
          <img 
            src="https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif" 
            alt="" 
            className="mx-auto" 
          />
        </div>
      )}
    </main>
  )
}

export default App