        // ============================================
        // 🎨 見た目のカスタマイズ設定（ここを編集！）
        // ============================================

        const LEVEL_THEMES = {
            1: {
                title: "木",
                buttonImage: "img/ki.jpg",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                containerBg: "rgba(255, 255, 255, 0.95)",
                buttonBg: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
                statBg: "rgba(102, 126, 234, 0.2)",
                itemBg: "rgba(102, 126, 234, 0.15)",
                textColor: "#333",
                requiredScore: 200,
                buttonDurability: 100,
                breakReward: 10
            },
            2: {
                title: "石",
                buttonImage: "img/isi.jpg",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                containerBg: "rgba(255, 255, 255, 0.95)",
                buttonBg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                statBg: "rgba(240, 147, 251, 0.2)",
                itemBg: "rgba(240, 147, 251, 0.15)",
                textColor: "#333",
                requiredScore: 1000,
                buttonDurability: 250,
                breakReward: 50,
                particles: ['🧱', '🟫', '🟤', '💥', '💨', '✨']
            },
            3: {
                title: "鉄鉱石",
                buttonImage: "img/tekkouseki.jpg",
                background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                containerBg: "rgba(255, 255, 255, 0.95)",
                buttonBg: "linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)",
                statBg: "rgba(67, 233, 123, 0.2)",
                itemBg: "rgba(67, 233, 123, 0.15)",
                textColor: "#333",
                requiredScore: 5000,
                buttonDurability: 600,
                breakReward: 200,
                particles: ['🪵', '🌿', '🍃', '💨', '🟫', '🟤']
            },
            4: {
                title: "金鉱石",
                buttonImage: "img/kinnkouseki.jpg",
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                containerBg: "rgba(255, 255, 255, 0.95)",
                buttonBg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                statBg: "rgba(79, 172, 254, 0.2)",
                itemBg: "rgba(79, 172, 254, 0.15)",
                textColor: "#333",
                requiredScore: 20000,
                buttonDurability: 1500,
                breakReward: 800
            },
            5: {
                title: "ダイヤ鉱石",
                buttonImage: "img/daiyakouseki.jpg",
                background: "linear-gradient(135deg, #fa8231 0%, #fc6075 100%)",
                containerBg: "rgba(255, 255, 255, 0.95)",
                buttonBg: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
                statBg: "rgba(250, 130, 49, 0.2)",
                itemBg: "rgba(250, 130, 49, 0.15)",
                textColor: "#333",
                requiredScore: 100000,
                buttonDurability: 4000,
                breakReward: 3000
            },
            6: {
                title: "ネザライト鉱石",
                buttonImage: "img/nezaraitokouseki.jpg",
                background: "linear-gradient(135deg, #2e1437 0%, #4a148c 100%)",
                containerBg: "rgba(255, 255, 255, 0.95)",
                buttonBg: "linear-gradient(135deg, #7b2ff7 0%, #f107a3 100%)",
                statBg: "rgba(123, 47, 247, 0.2)",
                itemBg: "rgba(123, 47, 247, 0.15)",
                textColor: "#333",
                requiredScore: 500000,
                buttonDurability: 10000,
                breakReward: 15000
            }
        };

        // アイテムの設定（自動破壊機能を削除）
        const SHOP_ITEMS = [
            {
                name: "木のツルハシ",
                itemImage: "img/kinoturuhasi.png",
                baseCost: 15,
                breakPower: 1,
                costMultiplier: 1.15
            },
            {
                name: "石のツルハシ",
                itemImage: "img/isinoturuhasi.png",
                baseCost: 100,
                breakPower: 3,
                costMultiplier: 1.2
            },
            {
                name: "鉄のツルハシ",
                itemImage: "img/tetunoturuhasi.png",
                baseCost: 500,
                breakPower: 10,
                costMultiplier: 1.25
            },
            {
                name: "金のツルハシ",
                itemImage: "img/kinnnoturuhasi.png",
                baseCost: 2000,
                breakPower: 30,
                costMultiplier: 1.3
            },
            {
                name: "ダイヤのツルハシ",
                itemImage: "img/daiyanoturuhasi.png",
                baseCost: 10000,
                breakPower: 100,
                costMultiplier: 1.35
            },
            {
                name: "ネザライトのツルハシ",
                itemImage: "img/nezaraitonoturuhasi.png",
                baseCost: 50000,
                breakPower: 400,
                costMultiplier: 1.4
            }
        ];

        // ============================================
        // ゲームロジック
        // ============================================

        let score = 0;
        let level = 1;
        let breakPower = 1;
        let totalBreaks = 0;

        let currentButtonLevel = 1;
        let maxDurability = LEVEL_THEMES[level].buttonDurability;
        let currentDurability = maxDurability;
        let breakReward = LEVEL_THEMES[level].breakReward;

        let items = SHOP_ITEMS.map(item => ({
            ...item,
            owned: 0,
            currentCost: item.baseCost
        }));

        const scoreEl = document.getElementById('score');
        const clickBtn = document.getElementById('clickButton');
        const levelEl = document.getElementById('levelDisplay');
        const progressBar = document.getElementById('progressBar');
        const breakPowerStat = document.getElementById('breakPowerStat');
        const totalBreaksStat = document.getElementById('totalBreaksStat');
        const itemsContainer = document.getElementById('itemsContainer');
        const gameTitle = document.getElementById('gameTitle');
        const durabilityBar = document.getElementById('durabilityBar');
        const buttonLevelEl = document.getElementById('buttonLevel');
        const breakRewardEl = document.getElementById('breakReward');

        function updateTheme() {
            const theme = LEVEL_THEMES[level];
            document.body.style.background = theme.background;
            document.querySelector('.container').style.background = theme.containerBg;
            document.querySelector('.container').style.color = theme.textColor;

            if (theme.buttonImage) {
                clickBtn.style.backgroundImage = `url('${theme.buttonImage}')`;
                clickBtn.classList.add('has-image');
                clickBtn.textContent = '';
            } else {
                clickBtn.style.backgroundImage = 'none';
                clickBtn.style.background = theme.buttonBg;
                clickBtn.classList.remove('has-image');
                clickBtn.textContent = theme.emoji;
            }

            gameTitle.textContent = theme.title;

            document.querySelectorAll('.stat').forEach(stat => {
                stat.style.background = theme.statBg;
            });

            maxDurability = theme.buttonDurability;
            currentDurability = maxDurability;
            breakReward = theme.breakReward * currentButtonLevel;
            updateDurabilityBar();
        }

        function updateDisplay() {
            scoreEl.textContent = Math.floor(score) + ' ポイント';
            levelEl.textContent = `レベル ${level}`;
            breakPowerStat.textContent = `破壊力: ${breakPower}`;
            totalBreaksStat.textContent = `破壊回数: ${totalBreaks}`;
            buttonLevelEl.textContent = `ボタンLv.${currentButtonLevel}`;
            breakRewardEl.textContent = breakReward;

            const nextLevel = level + 1;
            if (LEVEL_THEMES[nextLevel]) {
                const required = LEVEL_THEMES[nextLevel].requiredScore;
                const progress = Math.min((score / required) * 100, 100);
                progressBar.style.width = progress + '%';
                progressBar.textContent = `次のレベルまで: ${Math.max(0, Math.floor(required - score))}`;
            } else {
                progressBar.style.width = '100%';
                progressBar.textContent = '最大レベル！';
            }
        }

        function updateDurabilityBar() {
            const percentage = (currentDurability / maxDurability) * 100;
            durabilityBar.style.width = percentage + '%';
            durabilityBar.textContent = `${Math.floor(currentDurability)} / ${maxDurability}`;

            if (percentage < 30) {
                clickBtn.classList.add('damaged');
            } else {
                clickBtn.classList.remove('damaged');
            }
        }

        function damageButton(damage) {
            currentDurability -= damage;

            if (currentDurability <= 0) {
                breakButton();
            } else {
                clickBtn.classList.add('breaking');
                setTimeout(() => clickBtn.classList.remove('breaking'), 300);
            }

            updateDurabilityBar();
        }

        function breakButton() {
            clickBtn.classList.add('destroyed');
            totalBreaks++;
            score += breakReward;

            const rect = clickBtn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            createParticles(centerX, centerY, 12);

            showFloatingText(`+${breakReward} 💥`, clickBtn.offsetLeft + 100, clickBtn.offsetTop, '#FFD700');

            setTimeout(() => {
                clickBtn.classList.remove('destroyed');
                clickBtn.classList.remove('damaged');
                currentButtonLevel++;
                breakReward = LEVEL_THEMES[level].breakReward * currentButtonLevel;
                currentDurability = maxDurability;
                updateDurabilityBar();
                updateDisplay();
            }, 500);

            checkLevelUp();
        }

        function checkLevelUp() {
            const nextLevel = level + 1;
            if (LEVEL_THEMES[nextLevel] && score >= LEVEL_THEMES[nextLevel].requiredScore) {
                level = nextLevel;
                currentButtonLevel = 1;
                updateTheme();
                showFloatingText('🎉 レベルアップ！', clickBtn.offsetLeft + 100, clickBtn.offsetTop - 50, '#FFD700');
            }
        }

        function showFloatingText(text, x, y, color = '#4CAF50') {
            const floatEl = document.createElement('div');
            floatEl.className = 'float-number';
            floatEl.textContent = text;
            floatEl.style.left = x + 'px';
            floatEl.style.top = y + 'px';
            floatEl.style.color = color;
            document.body.appendChild(floatEl);

            setTimeout(() => floatEl.remove(), 1000);
        }

        function createParticles(x, y, count = 8) {
            const particles = ['⬛', '◼️', '◾', '▪️'];

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.textContent = particles[Math.floor(Math.random() * particles.length)];

                const angle = (Math.PI * 2 * i) / count;
                const distance = 80 + Math.random() * 40;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                const rotate = Math.random() * 720 - 360;

                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                particle.style.setProperty('--rotate', rotate + 'deg');

                document.body.appendChild(particle);

                setTimeout(() => particle.remove(), 800);
            }
        }

        clickBtn.addEventListener('click', (e) => {
            damageButton(breakPower);
            showFloatingText('-' + breakPower, e.clientX, e.clientY, '#ff4444');
            createParticles(e.clientX, e.clientY, 6);
            updateDisplay();
            updateShop();
        });

        function buyItem(index) {
            const item = items[index];
            if (score >= item.currentCost) {
                score -= item.currentCost;
                item.owned++;
                breakPower += item.breakPower;
                item.currentCost = Math.floor(item.baseCost * Math.pow(item.costMultiplier, item.owned));
                updateDisplay();
                updateShop();
            }
        }

        function updateShop() {
            const theme = LEVEL_THEMES[level];
            itemsContainer.innerHTML = items.map((item, index) => {
                const canBuy = score >= item.currentCost;
                const imageHtml = item.itemImage
                    ? `<img src="${item.itemImage}" alt="${item.name}" class="item-image">`
                    : '';
                return `
                    <div class="item ${canBuy ? '' : 'disabled'}"
                        style="background: ${theme.itemBg}; border-color: ${canBuy ? theme.buttonBg : 'transparent'}"
                        onclick="buyItem(${index})">
                        ${imageHtml}
                        <div class="item-name">${item.name}</div>
                        <div class="item-cost">💰 ${item.currentCost}</div>
                        <div>破壊力: +${item.breakPower}</div>
                        <div class="item-owned">所持: ${item.owned}</div>
                    </div>
                `;
            }).join('');
        }

        updateTheme();
        updateDisplay();
        updateShop();
