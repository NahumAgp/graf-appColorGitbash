document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const redSlider = document.getElementById('red-slider');
    const greenSlider = document.getElementById('green-slider');
    const blueSlider = document.getElementById('blue-slider');
    const redInput = document.getElementById('red-input');
    const greenInput = document.getElementById('green-input');
    const blueInput = document.getElementById('blue-input');
    const rgbInput = document.getElementById('rgb-input');
    const hexInput = document.getElementById('hex-input');
    const applyRgbBtn = document.getElementById('apply-rgb-btn');
    const applyHexBtn = document.getElementById('apply-hex-btn');
    const colorPicker = document.getElementById('color-picker');
    const colorDisplay = document.getElementById('color-display');
    const redValue = document.getElementById('red-value');
    const greenValue = document.getElementById('green-value');
    const blueValue = document.getElementById('blue-value');
    const colorCode = document.getElementById('color-code');
    const hexCode = document.getElementById('hex-code');
    const copyBtn = document.getElementById('copy-btn');

    // Función para convertir RGB a HEX
    function rgbToHex(r, g, b) {
        return '#' + 
            r.toString(16).padStart(2, '0') +
            g.toString(16).padStart(2, '0') +
            b.toString(16).padStart(2, '0');
    }

    // Función para convertir HEX a RGB
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        return [
            parseInt(hex.substring(0, 2), 16),
            parseInt(hex.substring(2, 4), 16),
            parseInt(hex.substring(4, 6), 16)
        ];
    }

    // Función para actualizar la interfaz
    function updateColor() {
        const r = parseInt(redSlider.value);
        const g = parseInt(greenSlider.value);
        const b = parseInt(blueSlider.value);

        // Actualizar valores mostrados
        redValue.textContent = r;
        greenValue.textContent = g;
        blueValue.textContent = b;

        // Sincronizar inputs numéricos
        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;

        // Actualizar color de fondo
        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        colorDisplay.style.backgroundColor = rgbColor;

        // Actualizar código RGB y HEX
        colorCode.textContent = `RGB: ${r}, ${g}, ${b}`;
        const hexColor = rgbToHex(r, g, b);
        hexCode.value = hexColor.toUpperCase();
        hexInput.value = hexColor.toUpperCase();

        // Ajustar color del texto según el brillo del fondo
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        colorCode.style.color = brightness > 128 ? 'black' : 'white';
    }

    // Event listeners para los sliders
    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    // Event listeners para los inputs numéricos
    redInput.addEventListener('input', function() {
        let value = Math.min(255, Math.max(0, parseInt(this.value) || 0));
        redSlider.value = value;
        updateColor();
    });

    greenInput.addEventListener('input', function() {
        let value = Math.min(255, Math.max(0, parseInt(this.value) || 0));
        greenSlider.value = value;
        updateColor();
    });

    blueInput.addEventListener('input', function() {
        let value = Math.min(255, Math.max(0, parseInt(this.value) || 0));
        blueSlider.value = value;
        updateColor();
    });

    // Event listener para el botón de aplicar RGB
    applyRgbBtn.addEventListener('click', function() {
        const values = rgbInput.value.split(',').map(val => {
            return Math.min(255, Math.max(0, parseInt(val.trim()) || 0));
        });
        
        if (values.length === 3) {
            redSlider.value = values[0];
            greenSlider.value = values[1];
            blueSlider.value = values[2];
            updateColor();
        }
    });

    // Event listener para el botón de aplicar HEX
    applyHexBtn.addEventListener('click', function() {
        const hexValue = hexInput.value.replace('#', '');
        if (hexValue.length === 6) {
            const [r, g, b] = hexToRgb(hexValue);
            redSlider.value = r;
            greenSlider.value = g;
            blueSlider.value = b;
            updateColor();
        }
    });

    // Event listener para Enter en los inputs
    rgbInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyRgbBtn.click();
    });

    hexInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyHexBtn.click();
    });

    // Click derecho en el cuadro de color para abrir color picker
    colorDisplay.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        colorPicker.click();
    });

    // Click izquierdo también funciona
    colorDisplay.addEventListener('click', function() {
        colorPicker.click();
    });

    // Event listener para el color picker
    colorPicker.addEventListener('input', function() {
        const hexValue = this.value.replace('#', '');
        const [r, g, b] = hexToRgb(hexValue);
        redSlider.value = r;
        greenSlider.value = g;
        blueSlider.value = b;
        updateColor();
    });

    // Función para copiar al portapapeles
    copyBtn.addEventListener('click', function() {
        hexCode.select();
        document.execCommand('copy');
        
        // Feedback visual
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check me-1"></i>Copiado!';
        copyBtn.classList.remove('btn-success');
        copyBtn.classList.add('btn-primary');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('btn-primary');
            copyBtn.classList.add('btn-success');
        }, 2000);
    });

    // Inicializar
    updateColor();
});