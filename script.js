// Načítanie poznámok z data.json
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        const content = document.getElementById("content");
        content.innerHTML = ''; // Vyčistíme loading text

        for (const subject in data) {
            // Vytvoríme sekciu
            const section = document.createElement("div");
            section.className = "section";

            // Pridáme nadpis sekcie
            const h2 = document.createElement("h2");
            h2.innerHTML = `<span class="emoji">📖</span>${subject}`;
            section.appendChild(h2);

            // Vytvoríme grid pre kartičky
            const cardGrid = document.createElement("div");
            cardGrid.className = "card-grid";

            // Pre každú poznámku vytvoríme kartičku
            data[subject].forEach(note => {
                const card = document.createElement("a");
                card.href = note.file;
                card.className = "card";

                // Názov poznámky
                const cardTitle = document.createElement("div");
                cardTitle.className = "card-title";
                cardTitle.textContent = `${note.emoji || '📄'} ${note.title}`;
                card.appendChild(cardTitle);

                // Popis poznámky (ak existuje)
                if (note.description) {
                    const cardDesc = document.createElement("div");
                    cardDesc.className = "card-description";
                    cardDesc.textContent = note.description;
                    card.appendChild(cardDesc);
                }

                // Kategória
                const category = document.createElement("span");
                category.className = "category";
                category.textContent = subject;
                card.appendChild(category);

                cardGrid.appendChild(card);
            });

            section.appendChild(cardGrid);
            content.appendChild(section);
        }
    })
    .catch(error => {
        const content = document.getElementById("content");
        content.innerHTML = '<div class="section"><p style="color: #f87171;">Chyba pri načítaní poznámok. Skontrolujte, či existuje súbor data.json.</p></div>';
        console.error('Error loading data:', error);
    });