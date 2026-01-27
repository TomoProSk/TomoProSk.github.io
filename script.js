fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const content = document.getElementById("content");

    for (const subject in data) {
      const section = document.createElement("div");
      section.className = "section";

      const h2 = document.createElement("h2");
      h2.textContent = subject;
      section.appendChild(h2);

      data[subject].forEach(note => {
        const a = document.createElement("a");
        a.href = note.file;
        a.textContent = note.title;
        a.target = "_blank";
        section.appendChild(a);
      });

      content.appendChild(section);
    }
  });

 if (window.innerWidth <= 600) {
    document.getElementById("style").href = "mobileStyle.css";
  }