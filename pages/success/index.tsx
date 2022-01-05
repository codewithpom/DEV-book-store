// You need to install React/React-DOM
import { Fireworks } from 'fireworks/lib/react'

function App() {
    let fxProps = {
        count: 3,
        interval: 200,
        colors: ['#cc3333', '#4CAF50', '#81C784'],
        calc: (props, i) => ({
            ...props,
            x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
            y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
    }

    return (
        <div>
            <Fireworks {...fxProps} />
            <h1>Congrats!</h1>
        </div>
    )
}