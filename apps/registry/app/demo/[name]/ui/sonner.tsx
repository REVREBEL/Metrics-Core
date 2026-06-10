import {
  ActionSonner,
  ErrorSonner,
  Sonner,
  SuccessfulSonner,
  WarningSonner,
} from "./sonner-toasts";

export const sonner = {
  name: "sonner",
  components: {
    Default: <Sonner />,
    Success: <SuccessfulSonner />,
    Warning: <WarningSonner />,
    Error: <ErrorSonner />,
    Action: <ActionSonner />,
  },
};
