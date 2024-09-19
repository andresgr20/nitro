import ReactGA from "react-ga4";

export const initGA = (measurementId: string): void => {
  ReactGA.initialize(measurementId);
};

export const logPageView = (): void => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
export const logEvent = (
  category: string,
  action: string,
  label?: string
): void => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
