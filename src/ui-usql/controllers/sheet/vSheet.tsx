import { Sheet } from "../../entities";
import { SheetUI, CSheet } from "./cSheet";
import { VEntity } from "../VM";

export abstract class VSheet extends VEntity<Sheet, SheetUI, CSheet> {
}
