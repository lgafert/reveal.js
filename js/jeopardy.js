var table = [];
var maxIndex = 0;

function ensureRow(table, index) {
  table[index] = table[index] || [];
  return table[index];
}

questions.forEach(function (question) {
  ensureRow(table, 0).push(question.category);
  var levelsHtml = "<section>";

  question.levels.forEach(function (level, index) {
    maxIndex = Math.max(maxIndex, index + 1);
    ensureRow(table, index + 1).push(level.dollars);
    levelsHtml += "<section class='question'>" +
      "<table>" +
      "<tr><td></td><td>" + level.question + "</td><td></td></tr>" +
      "<tr><td class='button' onclick='Reveal.slide(0,0);'>home</td><td></td><td class='button' onclick='Reveal.nextFragment();'>answer</td></tr>" +
      "<tr><td></td><td class='fragment'>" + level.answer + "</td><td></td></tr>" +
      "</table>" +
      "</section>";
  });
  levelsHtml += "</section>";

  document.getElementById('slides').innerHTML += levelsHtml;
});

var categoryHtml = "<tr>";
table[0].forEach(function (category) {
  categoryHtml += "<th class='category'>" + category + "</th>";
});
categoryHtml += "</tr>";

var startQuestion = function (element, i, j) {
  element.className += " done";
  element.onclick = "";
  Reveal.slide(i, j);
};

for (var i = 1; i <= maxIndex; i++) {
  categoryHtml += "<tr>";
  table[i].forEach(function (dollars, j) {
    categoryHtml += "<td class='level' onclick='startQuestion(this, " + (j + 1) + ", " + (i - 1) + ")'>$" + dollars + "</td>";
  });
  categoryHtml += "</tr>";
}

document.getElementById('categories').innerHTML += categoryHtml;
