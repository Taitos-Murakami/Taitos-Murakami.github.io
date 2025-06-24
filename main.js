let yukicontener = document.querySelector("body");
function yuki_fall(){
    let yuki = document.createElement("span");
    yuki.className = "snow";
    
    const minSize = 5;
    const maxSize = 10;
    let snowSize = Math.random() * (maxSize - minSize) + minSize;
    yuki.style.width = snowSize + "px";
    yuki.style.height = snowSize + "px";
    yuki.style.left = (Math.random() * 90 + 5) + "%";

    let Yzahyouy = 0;
    let leftzahyou = parseFloat(yuki.style.left);

    const countUp = () => {
        Yzahyouy += Math.random() + Math.random();
        leftzahyou += Math.random() * 0.17;
        yuki.style.top = Yzahyouy + "%";
        yuki.style.left = leftzahyou + "%";
    };

    const intervalId = setInterval(() => {
        countUp();
        if (Yzahyouy > 100) {
            clearInterval(intervalId);
        }
    }, 50);

    yukicontener.appendChild(yuki);

    setTimeout(() => {
        yuki.remove();
    }, 6000);
}
setInterval(yuki_fall, 200);


document.addEventListener('DOMContentLoaded', () => {
    const navItems = [
        { selector: '.keybord1-div a[href="./profile.html"]', command: 'cd profile', target: './profile.html' },
        // 他のキーを追加可能
    ];

    navItems.forEach(item => {
        const link = document.querySelector(item.selector);
        if (link) {
            const keyDiv = link.closest('.keybord1-div');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                animateCommand(item.command, () => {
                    window.location.href = item.target;
                }, keyDiv);
            });
        }
    });
});




function animateCommand(command, callback, pressedKeyDiv = null) {
    const typedText = document.getElementById('typed-text');
    typedText.textContent = '';  // リセット

    let index = 0;

    if (pressedKeyDiv) {
        pressedKeyDiv.classList.add('pressed'); // 最初に押されたキー（例：ヘッダー連携）を沈める
    }

    const interval = setInterval(() => {
        if (index < command.length) {
            const char = command.charAt(index).toLowerCase();

            // キーボードの中から該当文字のキーを探す
            const keyElement = Array.from(document.querySelectorAll('.keybord1-div')).find(div =>
                div.textContent.trim().toLowerCase() === char
            );

            if (keyElement) {
                keyElement.classList.add('pressed');
                setTimeout(() => {
                    keyElement.classList.remove('pressed');
                }, 250); // 少し押されたあとに戻る
            }

            typedText.textContent += command.charAt(index);
            index++;
        } else {
            clearInterval(interval);

            // ⏸ まず1秒待つ（入力完了後の間）
            setTimeout(() => {
                // "Enter" の演出
                typedText.innerHTML += '<br><span style="opacity:0.6;">[Enter]</span>';

                const enterKey = Array.from(document.querySelectorAll('.keybord1-div')).find(div =>
                    div.textContent.trim().toLowerCase() === 'enter'
                );
                if (enterKey) {
                    enterKey.classList.add('pressed');
                    setTimeout(() => {
                        enterKey.classList.remove('pressed');
                    }, 300);
                }

                if (pressedKeyDiv) {
                    pressedKeyDiv.classList.remove('pressed');
                }

                // ✅ ページ遷移はさらにその後
                setTimeout(callback, 1000);
            }, 1000); // ← ここが「1秒待つ」部分
        }

    }, 200); // 文字入力の間隔
}


document.addEventListener('DOMContentLoaded', () => {
    const headerLinks = document.querySelectorAll('header a');
    const keyboardKeys = document.querySelectorAll('.keybord1-div');

    headerLinks.forEach(link => {
        const href = link.getAttribute('href');
        const pageName = href.replace('./', '').replace('.html', '').toLowerCase(); // 例: "profile"

        // 対応するキーを探す（テキストが完全一致）
        let matchedKeyDiv = null;
        keyboardKeys.forEach(keyDiv => {
            const keyText = keyDiv.textContent.trim().toLowerCase();
            if (keyText === pageName) {
                matchedKeyDiv = keyDiv;
            }
        });

        if (matchedKeyDiv) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                animateCommand(`cd ${pageName}`, () => {
                    window.location.href = href;
                }, matchedKeyDiv);
            });
        } else {
            // キーボードに該当キーがない場合でも演出はできる
            link.addEventListener('click', (e) => {
                e.preventDefault();
                animateCommand(`cd ${pageName}`, () => {
                    window.location.href = href;
                });
            });
        }
    });
});





