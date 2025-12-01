// === CONFIGURACIÓN INICIAL === //
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupFilters();
    setupTabs();
    setupForm();
    setupAccordion();
    setupQuickExit();
    
    // Mostrar contenido inicial (Mujeres por defecto)
    showGroupContent('women');
}

// === SISTEMA DE FILTROS (Mujeres/Hombres/Menores) === //
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Quitar active de todos los botones
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            
            // Poner active al botón clickeado con animación
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            // Obtener qué grupo se seleccionó
            const selectedGroup = this.getAttribute('data-group');
            
            // Actualizar el contenido según el grupo
            updateContentForGroup(selectedGroup);
            
            // Efecto de sonido (opcional)
            playClickSound();
        });
    });
}

function updateContentForGroup(group) {
    // Obtener pestaña activa
    const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
    
    // Ocultar todo el contenido de grupos primero
    const allGroupContent = document.querySelectorAll('.tab-content-inner[class*="group-"]');
    allGroupContent.forEach(content => {
        content.style.display = 'none';
        content.style.opacity = '0';
    });
    
    // Mostrar solo el contenido del grupo seleccionado en la pestaña activa
    if (activeTab !== 'evaluacion' && activeTab !== 'mapa') {
        const groupContent = document.querySelectorAll(`.group-${group}`);
        groupContent.forEach(content => {
            content.style.display = 'block';
            setTimeout(() => {
                content.style.opacity = '1';
            }, 50);
        });
    }
    
    // Actualizar colores del tema según el grupo
    updateThemeColors(group);
}

function updateThemeColors(group) {
    const root = document.documentElement;
    const colors = {
        women: { primary: '#e91e63', light: '#fce4ec', dark: '#ad1457' },
        men: { primary: '#2196f3', light: '#e3f2fd', dark: '#1565c0' },
        minors: { primary: '#ff9800', light: '#fff3e0', dark: '#ef6c00' }
    };
    
    const colorSet = colors[group] || colors.women;
    
    root.style.setProperty('--primary-color', colorSet.primary);
    root.style.setProperty('--primary-light', colorSet.light);
    root.style.setProperty('--primary-dark', colorSet.dark);
}

function playClickSound() {
    // Silencioso por seguridad - no reproducir sonidos reales
    console.log('Filter changed');
}

// === SISTEMA DE PESTAÑAS === //
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Quitar active de todos los botones
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            
            // Poner active al botón clickeado
            this.classList.add('active');
            this.style.transform = 'scale(1.02)';
            
            // Obtener qué pestaña se seleccionó
            const tabId = this.getAttribute('data-tab');
            
            // Ocultar todo el contenido de pestañas
            const allPanes = document.querySelectorAll('.tab-pane');
            allPanes.forEach(pane => {
                pane.style.display = 'none';
                pane.style.opacity = '0';
            });
            
            // Mostrar la pestaña seleccionada
            const activePane = document.getElementById(tabId);
            activePane.style.display = 'block';
            setTimeout(() => {
                activePane.style.opacity = '1';
            }, 100);
            
            // Mostrar el contenido correcto según el grupo activo
            const activeGroup = document.querySelector('.filter-btn.active').getAttribute('data-group');
            showCorrectTabContent(tabId, activeGroup);
            
            // Inicializar mapa si es necesario
            if (tabId === 'mapa') {
                setTimeout(() => {
                    initializeMap(activeGroup);
                }, 300);
            }
        });
    });
}

function showCorrectTabContent(tabId, activeGroup) {
    // Para evaluación y mapa, mostrar contenido general
    if (tabId === 'evaluacion' || tabId === 'mapa') {
        return;
    }
    
    // Para otras pestañas, mostrar contenido del grupo activo
    const groupContent = document.querySelectorAll(`.tab-content-inner.group-${activeGroup}`);
    groupContent.forEach(content => {
        if (content.closest('.tab-pane').id === tabId) {
            content.style.display = 'block';
            setTimeout(() => {
                content.style.opacity = '1';
            }, 150);
        }
    });
}

// === FORMULARIO DE EVALUACIÓN === //
function setupForm() {
    const questions = [
        {
            id: 1,
            text: "¿Con qué frecuencia tus amigos o familiares hacen comentarios sobre tu forma de vestir o tu apariencia?",
            options: [
                { value: 0, text: "Nunca" },
                { value: 1, text: "Rara vez" },
                { value: 2, text: "A veces" },
                { value: 3, text: "Frecuentemente" }
            ]
        },
        {
            id: 2,
            text: "¿Alguna vez te han revisado tu teléfono o redes sociales sin tu permiso?",
            options: [
                { value: 0, text: "Nunca" },
                { value: 1, text: "Una vez" },
                { value: 2, text: "Algunas veces" },
                { value: 3, text: "Frecuentemente" }
            ]
        },
        {
            id: 3,
            text: "¿Tus amigos o pareja se molestan cuando pasas tiempo con otras personas?",
            options: [
                { value: 0, text: "Nunca" },
                { value: 1, text: "Rara vez" },
                { value: 2, text: "A veces" },
                { value: 3, text: "Frecuentemente" }
            ]
        },
        {
            id: 4,
            text: "¿Te han hecho sentir culpable por no querer hacer algo que otros esperaban de ti?",
            options: [
                { value: 0, text: "Nunca" },
                { value: 1, text: "Rara vez" },
                { value: 2, text: "A veces" },
                { value: 3, text: "Frecuentemente" }
            ]
        },
        {
            id: 5,
            text: "¿Alguien cercano a ti suele tomar decisiones importantes que te afectan sin consultarte?",
            options: [
                { value: 0, text: "Nunca" },
                { value: 1, text: "Rara vez" },
                { value: 2, text: "A veces" },
                { value: 3, text: "Frecuentemente" }
            ]
        },
        {
            id: 6,
            text: "¿Con qué frecuencia recibes críticas sobre cómo gastas tu dinero o manejas tus finanzas?",
            options: [
                { value: 0, text: "Nunca" },
                { value: 1, text: "Rara vez" },
                { value: 2, text: "A veces" },
                { value: 3, text: "Frecuentemente" }
            ]
        },
        {
            id: 7,
            text: "¿Tus opiniones son tomadas en cuenta en discusiones importantes?",
            options: [
                { value: 0, text: "Siempre" },
                { value: 1, text: "A menudo" },
                { value: 2, text: "Rara vez" },
                { value: 3, text: "Nunca" }
            ]
        },
        {
            id: 8,
            text: "¿Alguna vez te han hecho sentir que exageras cuando expresas tus emociones?",
            options: [
                { value: 0, text: "Nunca" },
                { value: 1, text: "Rara vez" },
                { value: 2, text: "A veces" },
                { value: 3, text: "Frecuentemente" }
            ]
        },
        {
            id: 9,
            text: "¿Te sientes presionado/a para hacer cosas con las que no estás cómodo/a?",
            options: [
                { value: 0, text: "Nunca" },
                { value: 1, text: "Rara vez" },
                { value: 2, text: "A veces" },
                { value: 3, text: "Frecuentemente" }
            ]
        },
        {
            id: 10,
            text: "¿Alguien cercano a ti controla con quién puedes hablar o pasar tiempo?",
            options: [
                { value: 0, text: "Nunca" },
                { value: 1, text: "Rara vez" },
                { value: 2, text: "A veces" },
                { value: 3, text: "Frecuentemente" }
            ]
        }
    ];

    const startBtn = document.getElementById('start-evaluation');
    const backBtn = document.getElementById('back-to-intro');
    const evaluateBtn = document.getElementById('evaluate-btn');
    const form = document.getElementById('evaluation-form');
    const intro = document.querySelector('.evaluation-intro');
    const container = document.getElementById('evaluation-container');
    const progressFill = document.getElementById('progress-fill');

    // Botón para comenzar evaluación
    startBtn.addEventListener('click', function() {
        intro.style.display = 'none';
        container.style.display = 'block';
        generateFormQuestions(questions, form);
        updateProgress(0);
    });

    // Botón para volver
    backBtn.addEventListener('click', function() {
        container.style.display = 'none';
        intro.style.display = 'block';
        resetForm();
    });

    // Botón para evaluar
    evaluateBtn.addEventListener('click', function() {
        const score = calculateScore(questions);
        if (score !== null) {
            showResults(score);
        }
    });

    // Actualizar progreso al responder preguntas
    form.addEventListener('change', function() {
        const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        const progress = (answered / questions.length) * 100;
        updateProgress(progress);
    });
}

function generateFormQuestions(questions, form) {
    form.innerHTML = '';
    
    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-card';
        questionDiv.innerHTML = `
            <div class="question-header">
                <span class="question-number">Pregunta ${question.id}</span>
                <h4 class="question-text">${question.text}</h4>
            </div>
            <div class="question-options">
                ${question.options.map((option, index) => `
                    <label class="option-label">
                        <input type="radio" name="q${question.id}" value="${option.value}" class="option-input">
                        <span class="option-text">${option.text}</span>
                    </label>
                `).join('')}
            </div>
        `;
        form.appendChild(questionDiv);
    });
}

function calculateScore(questions) {
    let totalScore = 0;
    let answeredQuestions = 0;
    
    questions.forEach(question => {
        const selectedOption = document.querySelector(`input[name="q${question.id}"]:checked`);
        if (selectedOption) {
            totalScore += parseInt(selectedOption.value);
            answeredQuestions++;
        }
    });
    
    if (answeredQuestions < questions.length) {
        alert('Por favor, responde todas las preguntas antes de evaluar.');
        return null;
    }
    
    return totalScore;
}

function showResults(score) {
    const resultsDiv = document.getElementById('results');
    const results = getResultsContent(score);
    
    resultsDiv.innerHTML = `
        <div class="results-card ${results.level}">
            <div class="results-header">
                <h3 class="results-title">Resultados de tu Evaluación</h3>
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-number">${score}</span>
                        <span class="score-total">/30</span>
                    </div>
                    <div class="score-level ${results.level}">${results.levelName}</div>
                </div>
            </div>
            <div class="results-content">
                <p class="results-message">${results.message}</p>
                <div class="recommendation-box">
                    <h4>💡 Recomendación:</h4>
                    <p>${results.recommendation}</p>
                </div>
                <div class="resources-section">
                    <h4>🛟 Recursos de Apoyo:</h4>
                    <div class="resources-list">
                        ${results.resources.map(resource => `
                            <div class="resource-help ${resource.emergency ? 'emergency' : ''}">
                                <h5>${resource.name}</h5>
                                <p class="help-number ${resource.emergency ? 'emergency-number' : ''}">${resource.phone}</p>
                                <p class="help-description">${resource.description}</p>
                                <button class="btn ${resource.emergency ? 'btn-emergency' : 'btn-primary'}" onclick="callNumber('${resource.phone.replace(/\D/g, '')}')">
                                    ${resource.emergency ? 'Llamar Ahora' : ' Llamar'}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getResultsContent(score) {
    if (score <= 10) {
        return {
            level: "low",
            levelName: "Riesgo Bajo",
            message: "Según tus respuestas, parece que tienes relaciones saludables en tu vida. Sin embargo, es importante mantener la comunicación abierta y establecer límites claros cuando sea necesario.",
            recommendation: "Continúa practicando la comunicación  y manteniendo relaciones basadas en el respeto mutuo. Recuerda que siempre es bueno estar informado sobre los recursos disponibles.",
            resources: [
                {
                    name: "Línea de la Vida",
                    phone: "800-911-2000",
                    description: "Orientación sobre relaciones saludables y bienestar emocional."
                },
                {
                    name: "IMPASS",
                    phone: "614-200-4810",
                    description: "Atención psicológica y talleres de desarrollo personal."
                }
            ]
        };
    } else if (score <= 20) {
        return {
            level: "medium",
            levelName: "Riesgo Medio",
            message: "Algunas de tus respuestas sugieren que podrías estar experimentando comportamientos de control o falta de respeto en tus relaciones. Estos patrones pueden indicar violencia psicológica y es importante prestarles atención.",
            recommendation: "Presta atención a estos comportamientos y considera establecer límites más claros. No dudes en buscar apoyo si te sientes incómoda/o. Tu bienestar emocional es importante.",
            resources: [
                {
                    name: "Línea de la Vida",
                    phone: "800-911-2000",
                    description: "Atención psicológica y orientación profesional."
                },
                {
                    name: "IMPASS",
                    phone: "614-200-4810",
                    description: "Atención psicológica y grupos de apoyo."
                },
                {
                    name: "CEDH",
                    phone: "614-201-2990",
                    description: "Asesoría en derechos humanos."
                }
            ]
        };
    } else {
        return {
            level: "high",
            levelName: "Riesgo Alto",
            message: "Tus respuestas indican patrones que pueden corresponder a situaciones de violencia. Es importante que sepas que no estás solo/a y que hay ayuda disponible. Tu seguridad y bienestar son lo más importante.",
            recommendation: "Considera contactar a alguno de los recursos de apoyo disponibles inmediatamente. Si estás en peligro, llama al 911. Recuerda que mereces vivir una vida libre de violencia.",
            resources: [
                {
                    name: "Emergencias",
                    phone: "911",
                    emergency: true,
                    description: "Llama inmediatamente si estás en peligro."
                },
                {
                    name: "Línea de la Vida",
                    phone: "800-911-2000",
                    description: "Orientación sobre violencia de género y apoyo psicológico inmediato."
                },
                {
                    name: "Fiscalía General del Estado",
                    phone: "614-429-3300",
                    description: "Atención legal y denuncias."
                }
            ]
        };
    }
}

function updateProgress(percentage) {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

function resetForm() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
    }
    
    updateProgress(0);
}

// === ACORDEÓN INFORMATIVO === //
function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            const arrow = this.querySelector('.accordion-arrow');
            
            // Cerrar otros acordeones en el mismo grupo
            const siblingItems = accordionItem.parentElement.querySelectorAll('.accordion-item');
            siblingItems.forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('open');
                    const content = item.querySelector('.accordion-content');
                    const siblingArrow = item.querySelector('.accordion-arrow');
                    content.style.maxHeight = '0';
                    content.style.padding = '0 20px';
                    if (siblingArrow) siblingArrow.style.transform = 'rotate(0deg)';
                }
            });
            
            // Alternar acordeón actual
            accordionItem.classList.toggle('open');
            
            if (accordionItem.classList.contains('open')) {
                accordionContent.style.padding = '20px';
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            } else {
                accordionContent.style.padding = '0 20px';
                accordionContent.style.maxHeight = '0';
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// === SALIDA RÁPIDA === //
function setupQuickExit() {
    const quickExit = document.getElementById('quick-exit');
    
    if (quickExit) {
        quickExit.addEventListener('click', function(e) {
            if (!confirm('¿Estás segura/o de que quieres salir rápidamente?\n\nSerás redirigido a Google para mayor seguridad.')) {
                e.preventDefault();
            }
        });
    }
    
    // Prevenir clic derecho para mayor seguridad
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
}

// === MAPA INTERACTIVO === //
function initializeMap(group) {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    // Limpiar contenedor
    mapContainer.innerHTML = '<div id="map" style="height: 500px; width: 100%; border-radius: 10px;"></div>';
    
    // Inicializar mapa centrado en Chihuahua
    const map = L.map('map').setView([28.6353, -106.0889], 13);

    // Capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Datos de centros según el grupo
    const centers = getCentersByGroup(group);
    
    // Agregar marcadores
    centers.forEach(center => {
        const marker = L.marker([center.lat, center.lng])
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <h3>${center.name}</h3>
                    <p><strong>Teléfono:</strong> ${center.phone}</p>
                    <p><strong> Dirección:</strong> ${center.address}</p>
                    <p><strong> Horario:</strong> ${center.schedule}</p>
                    <div class="popup-actions">
                        <button onclick="callNumber('${center.phone}')" class="popup-btn">📞 Llamar</button>
                    </div>
                </div>
            `);
    });

    // Ajustar tamaño del mapa
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

function getCentersByGroup(group) {
    const centers = {
        women: [
            {
                name: "ICHMUJERES",
                lat: 28.6353,
                lng: -106.0889,
                phone: "6144293505",
                address: "Av. Prol. Teófilo Borunda 2800-A, Col. Cuauhtémoc",
                schedule: "Lun-Vie 8:00-18:00"
            },
            {
                name: "CAVIM",
                lat: 28.6400,
                lng: -106.0850,
                phone: "6144109399",
                address: "Dirección confidencial",
                schedule: "24/7"
            }
        ],
        men: [
            {
                name: "Fiscalía General",
                lat: 28.6320,
                lng: -106.0830,
                phone: "6144293300",
                address: "Chihuahua, Chih.",
                schedule: "Lun-Dom 8:00-22:00"
            },
            {
                name: "IMPASS",
                lat: 28.6370,
                lng: -106.0800,
                phone: "6142004810",
                address: "Chihuahua, Chih.",
                schedule: "Lun-Vie 8:00-20:00"
            }
        ],
        minors: [
            {
                name: "DIF Estatal",
                lat: 28.6300,
                lng: -106.0900,
                phone: "6142144000",
                address: "Calle 5 de Mayo 321",
                schedule: "24/7"
            },
            {
                name: "Guardianna",
                lat: 28.6280,
                lng: -106.0950,
                phone: "6144121017",
                address: "Calle Fernando de Borja 316",
                schedule: "Lun-Vie 10:00-20:00"
            }
        ]
    };
    
    return centers[group] || centers.women;
}

// === FUNCIONES GLOBALES === //
function callNumber(phoneNumber) {
    if (confirm(`¿Quieres llamar al ${phoneNumber}?\n\nSerás redirigido a la aplicación de teléfono.`)) {
        window.open(`tel:${phoneNumber}`);
    }
}

// Hacer funciones globales
window.callNumber = callNumber;
window.resetForm = resetForm;