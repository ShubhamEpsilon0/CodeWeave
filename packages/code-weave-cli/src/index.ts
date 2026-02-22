import { Command } from "commander";
import { serveCommand } from "./commands/serve";

const program = new Command();
program.addCommand(serveCommand);

program.parse(process.argv);
