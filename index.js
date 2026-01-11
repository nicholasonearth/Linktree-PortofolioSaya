document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('tiltCard');

    card.addEventListener('click', function(e) {
        let aura = document.createElement('span');
        aura.classList.add('click-aura');

        let rect = card.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        aura.style.left = x + 'px';
        aura.style.top = y + 'px';

        card.appendChild(aura);

        setTimeout(() => {
            aura.remove();
        }, 800);
    });
});