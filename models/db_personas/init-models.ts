import type { Sequelize } from "sequelize";
import { Persona as _Persona } from "./Persona";
import type { PersonaAttributes, PersonaCreationAttributes } from "./Persona";

export {
  _Persona as Persona,
};

export type {
  PersonaAttributes,
  PersonaCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Persona = _Persona.initModel(sequelize);


  return {
    Persona: Persona,
  };
}
