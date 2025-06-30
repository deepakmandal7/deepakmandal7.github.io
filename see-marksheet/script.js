function splitMarks(total) {
  const th = Math.floor(total * 0.7);
  const pr = total - th;
  return { th, pr };
}

function getGrade(score) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 50) return "C+";
  if (score >= 40) return "C";
  if (score >= 32) return "D";
  return "F";
}

function generateCertificate() {
  try {
    // Get student info
    const name = document.getElementById("studentName").value.trim();
    const symbolNo = document.getElementById("symbolNo").value.trim();
    const dob = document.getElementById("dob").value;
    const school = document.getElementById("school").value.trim();

    if (!name || !symbolNo || !dob || !school) {
      alert("Please fill all student details!");
      return;
    }

    // Fill student info
    document.querySelector(".certName").textContent = name;
    document.querySelector(".certSymbolNo").textContent = symbolNo;
    document.querySelector(".certDob").textContent = new Date(
      dob
    ).toLocaleDateString();
    document.querySelector(".certSchoolName").textContent = school;

    // Subject definitions
    const subjects = [
      { id: "english", prefix: "certEng" },
      { id: "nepali", prefix: "certNep" },
      { id: "science", prefix: "certSci" },
      { id: "math", prefix: "certMath" },
      { id: "optmath", prefix: "certOptMath" },
      { id: "cpp", prefix: "certCpp" },
      { id: "microprocessor", prefix: "certMicro" },
      { id: "hardware", prefix: "certHardware" },
      { id: "dbms", prefix: "certDbms" },
    ];

    let grandTotal = 0;
    let failedSubjects = 0;

    subjects.forEach((subject) => {
      const total = parseInt(document.getElementById(subject.id).value) || 0;
      const { th, pr } = splitMarks(total);

      document.getElementById(`${subject.prefix}Th`).textContent = th;
      document.getElementById(`${subject.prefix}Pr`).textContent = pr;
      document.getElementById(`${subject.prefix}Total`).textContent = total;
      const grade = getGrade(total);
      document.getElementById(`${subject.prefix}Grade`).textContent = grade;

      grandTotal += total;
      if (total < 32) failedSubjects++;
    });

    const fullMarks = subjects.length * 100;
    const percentage = ((grandTotal / fullMarks) * 100).toFixed(2);
    const resultText =
      failedSubjects === 0
        ? `Passed with ${percentage}%`
        : `Failed with ${percentage}%`;

    // Find rows to fill totals/results
    const tableRows = document.querySelectorAll("table tbody tr");

    // Full Marks row: "Full Marks" is in the first <td>
    const fullMarksRow = Array.from(tableRows).find((row) =>
      row.children[0].textContent.includes("Full Marks")
    );
    const grandTotalRow = Array.from(tableRows).find((row) =>
      row.children[0].textContent.includes("Grand Total")
    );
    const resultRow = Array.from(tableRows).find((row) =>
      row.children[0].textContent.includes("Results")
    );

    console.log(fullMarksRow);

    if (grandTotalRow) grandTotalRow.children[1].textContent = grandTotal;
    if (resultRow) resultRow.children[1].textContent = resultText;

    // Set date of issue
    const issueDateElement = document.querySelector(
      ".marksheet-footer p:nth-child(2)"
    );
    if (issueDateElement) {
      issueDateElement.textContent = `DATE OF ISSUE: ${new Date().toLocaleDateString()}`;
    }
  } catch (error) {
    console.error("Error generating certificate:", error);
    alert("An error occurred while generating the certificate.");
  }
}
