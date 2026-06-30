import { ContentSection } from "@sections/content-section";
import { ProfileForm } from "@metrics-layouts/metrics-settings/profile-form";


export default function SettingsProfilePage() {
  return (
    <ContentSection
      title="Profile"
      desc="This is how others will see you on the site."
    >
      <ProfileForm />
    </ContentSection>
  );
}