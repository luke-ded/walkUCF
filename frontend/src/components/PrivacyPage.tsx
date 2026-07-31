import About from "./About.tsx";
import Settings from "./Settings.tsx";
import { FaWalking } from "react-icons/fa";
import { useState } from "react";

const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="mt-6 mb-2 text-lg font-bold first:mt-0 max-sm:text-base">
    {children}
  </h2>
);

const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-2">{children}</p>
);

const List: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className="mt-2 list-disc space-y-1 pl-6">{children}</ul>
);

function PrivacyPage() {
  const [about, toggleAbout] = useState(false);
  const [settings, toggleSettings] = useState(false);
  const [count, setCount] = useState(0);

  var settingsData = localStorage.getItem("settings");
  if (settingsData == null || settingsData == undefined) {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        units: "imperial",
        walkSpeed: 3,
        saveRoute: true,
        showLocation: true,
      }),
    );
  }

  const triggerRerender = () => {
    setCount(count + 1);
  };

  return (
    <div
      className={`relative h-screen w-screen cursor-default flex-col items-center justify-center overflow-hidden text-neutral-700 select-none dark:text-neutral-200 ${about || settings ? "overflow-y-hidden" : ""}`}
    >
      <div className="flex h-3/42 w-full max-w-full justify-between border-b-2 border-[#ffca09] bg-black/85 px-3 lg:h-1/14">
        <div className="flex items-center">
          <FaWalking size={20} className="h-6/10 w-auto text-[#ffca09]" />
          <h1 className="ml-3 text-3xl font-semibold text-neutral-200 max-sm:text-2xl">
            walkUCF
          </h1>
        </div>
      </div>
      <div className="h-20/21 w-full overflow-y-auto bg-gradient-to-b from-black/60 to-black/50 lg:h-13/14 lg:to-transparent">
        <div className="mx-auto mt-5 mb-10 h-fit rounded-md border-2 border-[#a48100] bg-[url(./assets/backgroundmap.jpg)] shadow-lg max-lg:w-9/10 lg:w-7/10 lg:max-w-4xl dark:border-[#ffca09]">
          <div className="flex h-fit w-full flex-col rounded-sm bg-[#d6d4d4]/80 dark:bg-black/80">
            <div className="flex items-center justify-center border-b-2 border-[#a48100] dark:border-[#ffca09]">
              <h1 className="py-1 text-2xl font-bold text-neutral-700 dark:text-neutral-200">
                Privacy Policy
              </h1>
            </div>

            <div className="text-md flex flex-col p-5 text-neutral-700 select-text max-sm:p-4 max-sm:text-sm dark:text-neutral-200">
              <a
                href="/"
                className="font-bold text-[#a48100] hover:text-[#ffe68c] dark:text-[#ffca09]"
              >
                &larr; Back to the map
              </a>

              <Text>
                This privacy policy applies to the walkUCF app for mobile
                devices and web browsers, together with any related services
                operated by Luke Dederich (collectively, the
                &quot;Application&quot;). Luke Dederich is hereby referred to as
                the &quot;Service Provider&quot;.
              </Text>

              <Heading>Information Collection and Use</Heading>
              <Text>
                The Application collects information when you download and use
                it. This information may include information such as
              </Text>
              <List>
                <li>Your device&apos;s Internet Protocol address</li>
                <li>your operating system you use</li>
              </List>

              <Heading>Location Information</Heading>
              <Text>
                The Application collects your device&apos;s location to provide
                location-based features.
              </Text>
              <List>
                <li>
                  Geolocation Services: The Service Provider may use location
                  data to provide location-based features or content.
                </li>
                <li>
                  Geolocation is used on-device to provide walking directions/routes, 
                  is never transmitted off the device, is never shared or sold, 
                  and can be revoked at any time in iOS Settings.
                </li>
              </List>

              <Heading>Your Rights</Heading>
              <Text>
                The Service Provider does not collect, process, or store any personal
                information. All data is processed on device. For questions, contact 
                the Service Provider at privacy@walkucf.com.
              </Text>

              <Heading>Your California privacy rights (CCPA/CPRA)</Heading>
              <Text>
                If you are a California resident, you have the right to know
                what personal information is collected, the right to delete
                personal information, the right to opt out of the sale or
                sharing of personal information, and the right to
                non-discrimination for exercising these rights. To exercise your
                CCPA/CPRA rights, contact the Service Provider at
                privacy@walkucf.com.
              </Text>

              <Heading>Third Party Access</Heading>
              <Text>
                Only aggregated, anonymized data is periodically transmitted to
                external services to aid the Service Provider in improving the
                Application and their service. The Service Provider may share
                your information with third parties in the ways that are
                described in this privacy statement.
              </Text>

              <Heading>Data Retention Policy</Heading>
              <Text>
                The Service Provider does not collect, store, or retain personal data.
              </Text>

              <Heading>Children</Heading>
              <Text>
                The Application is not intended for children under 13 years of
                age, or such higher age as required by applicable law. The
                Service Provider does not solicit data from children
                or market the Application to them.
              </Text>
              <Text>
                The Service Provider does not collect personally
                identifiable information from children, or any other users.
              </Text>

              <Heading>Security</Heading>
              <Text>
                The Service Provider is concerned about safeguarding the
                confidentiality of your information. The Service Provider
                does not collect any information; all data is processed on device.
              </Text>

              <Heading>Changes</Heading>
              <Text>
                The Service Provider may update this Privacy Policy from time to
                time. The Service Provider will notify you of material changes
                by posting the updated Privacy Policy with an effective date.
                Where required by law, the Service Provider will seek your
                consent to material changes before they take effect.
              </Text>
              <Text>
                Previous versions of this Privacy Policy will be maintained and
                made available upon request by contacting the Service Provider
                at privacy@walkucf.com.
              </Text>
              <Text>This privacy policy is effective as of 07-30-2026.</Text>

              <Heading>Contact Us</Heading>
              <Text>
                If you have any questions regarding privacy while using the
                Application, or have questions about the practices, please
                contact the Service Provider via email at privacy@walkucf.com.
              </Text>
            </div>
          </div>
        </div>
      </div>
      {about && <About toggleAbout={toggleAbout} />}
      {settings && (
        <Settings
          triggerRerender={triggerRerender}
          toggleSettings={toggleSettings}
        />
      )}
    </div>
  );
}

export default PrivacyPage;
