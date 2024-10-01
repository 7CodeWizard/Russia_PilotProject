import { useEffect, useState } from "react"
import { Stage, Layer, Line } from "react-konva"

const originalPositions = [
    { x: 0, y: 12, x1: 283, y1: 94 },
    { x: 106, y: 133, x1: 300, y1: 133 },
    { x: 0, y: 250, x1: 313, y1: 173 },
    { x: 760, y: 10, x1: 495, y1: 115 },
    { x: 610, y: 133, x1: 495, y1: 133 },
    { x: 728, y: 255, x1: 480, y1: 170 },
]

const CanvasComponent = () => {
    const [positions, setPositions] = useState(originalPositions)

    const calculateNewPositions = (scale) => {
        return originalPositions.map((item, index) => ({
            x: index === 0 ? item.x * 1.87 : item.x * scale,
            y: item.y,
            x1: index < 3 ? item.x1 * scale : item.x1 * 0.87,
            y1: item.y1,
        }))
    }

    useEffect(() => {
        const handleResize = () => {
            const newScaleFactor = window.innerWidth > 1440 ? 1 : window.innerWidth / 1440
            setPositions(calculateNewPositions(newScaleFactor))
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Stage width={800} height={400} style={{ position: 'absolute', top: '-30px', left: '-190px', padding: '43px 0px' }}>
            <Layer>
                {positions.map((item, index) => (
                    <Line
                        key={index}
                        points={[item.x, item.y, item.x1, item.y1]}
                        stroke="#686868"
                        strokeWidth={2}
                    />
                ))}
            </Layer>
        </Stage>
    )
}

export default CanvasComponent