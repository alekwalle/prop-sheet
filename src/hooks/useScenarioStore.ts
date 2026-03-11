import { useEffect, useMemo, useState } from "react";
import { PropertyScenario } from "../types";
import { sampleScenarios } from "../data/sampleScenarios";

const STORAGE_KEY = "rental-scenarios-v1";

type ScenarioState = {
  scenarios: PropertyScenario[];
  selectedId: string;
};

const generateId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `scn-${Math.random().toString(36).slice(2, 9)}`;

const baseEmptyScenario: PropertyScenario = {
  id: "new",
  name: "Nytt scenario",
  purchasePrice: 0,
  purchaseCosts: 0,
  loanAmount: 0,
  equity: 0,
  interestRate: 0.04,
  loanYears: 25,
  monthlyRent: 0,
  monthlyCommonCosts: 0,
  monthlyMunicipalFees: 0,
  monthlyPropertyTax: 0,
  monthlyUtilities: 0,
  monthlyOtherCosts: 0,
  monthlyInsurance: 0,
  vacancyRate: 0.05,
  maintenanceRate: 0.08,
  taxRate: 0.22,
  inflationRate: 0.02,
  annualRentGrowthRate: 0.02,
  projectionYears: 30,
  interestOnlyYears: 0,
  manualAnnualPayment: null
};

const makeNewScenario = (): PropertyScenario => ({
  ...baseEmptyScenario,
  id: generateId(),
  name: "Nytt scenario"
});

const loadFromStorage = (): ScenarioState => {
  if (typeof window === "undefined") {
    return { scenarios: sampleScenarios, selectedId: sampleScenarios[0].id };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new Error("no stored scenarios");
    const parsed = JSON.parse(raw) as ScenarioState;
    if (!Array.isArray(parsed.scenarios) || parsed.scenarios.length === 0) {
      throw new Error("invalid scenarios");
    }
    const selectedId =
      parsed.selectedId && parsed.scenarios.some((s) => s.id === parsed.selectedId)
        ? parsed.selectedId
        : parsed.scenarios[0].id;
    return { scenarios: parsed.scenarios, selectedId };
  } catch {
    const starter = makeNewScenario();
    return { scenarios: [starter], selectedId: starter.id };
  }
};

export const useScenarioStore = () => {
  const [state, setState] = useState<ScenarioState>(() => loadFromStorage());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const activeScenario = useMemo(
    () => state.scenarios.find((s) => s.id === state.selectedId) ?? state.scenarios[0],
    [state]
  );

  const selectScenario = (id: string) => {
    setState((prev) =>
      prev.scenarios.some((s) => s.id === id) ? { ...prev, selectedId: id } : prev
    );
  };

  const updateActiveScenario = (patch: Partial<PropertyScenario>) => {
    setState((prev) => ({
      ...prev,
      scenarios: prev.scenarios.map((s) =>
        s.id === prev.selectedId ? { ...s, ...patch } : s
      )
    }));
  };

  const createScenario = () => {
    const newScenario = makeNewScenario();
    setState((prev) => ({
      scenarios: [...prev.scenarios, newScenario],
      selectedId: newScenario.id
    }));
  };

  const duplicateScenario = (id: string) => {
    setState((prev) => {
      const source = prev.scenarios.find((s) => s.id === id);
      if (!source) return prev;
      const clone: PropertyScenario = {
        ...source,
        id: generateId(),
        name: `${source.name} (kopi)`
      };
      return {
        scenarios: [...prev.scenarios, clone],
        selectedId: clone.id
      };
    });
  };

  const renameScenario = (id: string, name: string) => {
    setState((prev) => ({
      ...prev,
      scenarios: prev.scenarios.map((s) => (s.id === id ? { ...s, name } : s))
    }));
  };

  const deleteScenario = (id: string) => {
    setState((prev) => {
      const filtered = prev.scenarios.filter((s) => s.id !== id);
      if (filtered.length === 0) {
        const replacement = makeNewScenario();
        return { scenarios: [replacement], selectedId: replacement.id };
      }
      const selectedId =
        prev.selectedId === id ? filtered[0]?.id ?? filtered[filtered.length - 1].id : prev.selectedId;
      return { scenarios: filtered, selectedId };
    });
  };

  return {
    scenarios: state.scenarios,
    selectedId: state.selectedId,
    activeScenario,
    selectScenario,
    updateActiveScenario,
    createScenario,
    duplicateScenario,
    renameScenario,
    deleteScenario
  };
};
