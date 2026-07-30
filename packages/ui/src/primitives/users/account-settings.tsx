import { Separator } from "@ui-core/separator";
import EmailPass from "@users//account-settings/content/email-password";
import ConnectAccount from "@users/account-settings/content/connect-account";
import DangerZone from "@users/account-settings/content/danger-zone";
import PersonalInfo from "@users/account-settings/content/personal-info";
import SocialUrl from "@users/account-settings/content/social-url";

const UserGeneral = () => {
  return (
    <section className="py-3">
      <div className="mx-auto max-w-7xl">
        <PersonalInfo />
        <Separator className="my-10" />
        <EmailPass />
        <Separator className="my-10" />
        <ConnectAccount />
        <Separator className="my-10" />
        <SocialUrl />
        <Separator className="my-10" />
        <DangerZone />
      </div>
    </section>
  );
};

export default UserGeneral;
