import MinimalLayout from "./minimal-layout";
import StorePage from "./store-page";

export const store = {
  name: "store",
  components: {
    Default: (
      <MinimalLayout>
        <StorePage />
      </MinimalLayout>
    ),
  },
};
