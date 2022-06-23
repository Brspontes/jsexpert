import database from "./../database.json";
import Person from "./person.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERM = ":q";

const terminaController = new TerminalController();
terminaController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminaController.question("What??");
    if (answer === STOP_TERM) {
      terminaController.closeTerminal();
      console.log("process finished");
      return;
    }
    const person = Person.generateInstanceFromString(answer);
    terminaController.updateTable(person.formatted(DEFAULT_LANG));

    return mainLoop();
  } catch (error) {
    console.log(error);
    console.error("Deu ruim!!");
    return mainLoop();
  }
}

await mainLoop();
