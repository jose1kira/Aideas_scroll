const image = document.getElementById('rotating-image');
const sections = document.querySelectorAll('.content-section');
const stops = [0, 90, 180, 270]; // Ángulos en los que se mostrarán las secciones
let currentStop = 0;

function updateRotationAndContent() {
    const scrollPosition = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / totalHeight;

    // Rotar la imagen basándose en el scroll
    let targetRotation = scrollPercentage * 360 * 2; // Ajusta el "2" para más o menos vueltas

    // Encontrar el "stop" más cercano
    currentStop = stops.reduce((prev, curr) => {
        return (Math.abs(curr - targetRotation % 360) < Math.abs(prev - targetRotation % 360) ? curr : prev);
    });

    // Ajustar la rotación a los stops
    const snapThreshold = 5; 
    if (Math.abs(targetRotation % 360 - currentStop) <= snapThreshold) {
        targetRotation = Math.round(targetRotation / 90) * 90;
    }

    image.style.transform = `rotate(${targetRotation}deg)`;

    // Mostrar la sección correspondiente
    sections.forEach((section, index) => {
        if (stops[index] === currentStop) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Evento para actualizar al hacer scroll
window.addEventListener('scroll', updateRotationAndContent);
window.addEventListener('DOMContentLoaded', updateRotationAndContent);
