
        let activePage = 'inicio';
        let activeTab = 'modulo-a';

        const effortData = {
            labels: [
                'Análise de Lucratividade (L)',
                'Checklist Digital e Workflow',
                'Testes e Refinamento UX/UI',
                'Gestão Documental & Alertas',
                'Integração Contabilística (API)',
                'Contratos, Pessoas, Parques'
            ],
            data: [12, 10, 10, 8, 8, 18]
        };

        function showPage(pageId, isMobile = false) {
            // Esconde a página ativa
            document.getElementById(`page-${activePage}`).classList.add('hidden');
            
            // Mostra a nova página
            document.getElementById(`page-${pageId}`).classList.remove('hidden');
            
            activePage = pageId;

            // Atualiza botões ativos
            const navButtons = document.querySelectorAll('.nav-button');
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('onclick').includes(`'${pageId}'`)) {
                    btn.classList.add('active');
                }
            });

            // Se for mobile, fecha o menu
            if (isMobile) {
                document.getElementById('mobile-menu').classList.add('hidden');
            }
            
            // Se for a página do plano, renderiza o gráfico
            if (pageId === 'plano') {
                renderEffortChart();
            }
        }

        function showTab(tabId, el) {
            // Esconde o painel ativo
            document.getElementById(activeTab).classList.add('hidden');
            // Mostra o novo painel
            document.getElementById(tabId).classList.remove('hidden');
            
            // Atualiza botões ativos
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            el.classList.add('active');

            activeTab = tabId;
        }

        function renderEffortChart() {
            const ctx = document.getElementById('effortChart').getContext('2d');
            // Destruir gráfico antigo se existir, para evitar flickering
            if (window.myEffortChart) {
                window.myEffortChart.destroy();
            }
            window.myEffortChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: effortData.labels,
                    datasets: [{
                        label: 'Person-Semanas (PS)',
                        data: effortData.data,
                        backgroundColor: 'rgba(79, 70, 229, 0.8)',
                        borderColor: 'rgba(79, 70, 229, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y', // Faz o gráfico ser horizontal
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.raw} PS`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Esforço (Person-Semanas)'
                            }
                        },
                        y: {
                            ticks: {
                                autoSkip: false
                            }
                        }
                    }
                }
            });
        }
        
        // Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            // Handler do menu mobile
            document.getElementById('mobile-menu-button').addEventListener('click', () => {
                document.getElementById('mobile-menu').classList.toggle('hidden');
            });
        });

   