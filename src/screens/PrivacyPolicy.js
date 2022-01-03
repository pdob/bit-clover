import React from 'react';
import { ScrollView, Text, StyleSheet } from "react-native";

const PrivacyPolicy = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.flatlistText}>

    1. WHAT INFORMATION DO WE COLLECT?
      Personal information you disclose to us
      In Short: We collect personal information that you provide to us.
      We collect personal information that you voluntarily provide to us when you express
      an interest in obtaining information about us or our products and Services, when you
      participate in activities on the App or otherwise when you contact us.
      {'\n'}      
  2. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
  In Short: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
  We may process or share your data that we hold based on the following legal basis:
  Consent: We may process your data if you have given us specific consent to use your personal information for a specific purpose.
  Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.
  Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.
  Legal Obligations: We may disclose your information where we are legally
  required to do so in order to comply with applicable law, governmental
  requests, a judicial proceeding, court order, or legal process, such as in
  response to a court order or a subpoena (including in response to public
  authorities to meet national security or law enforcement requirements).

  Vital Interests: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
  More specifically, we may need to process your data or share your personal information in the following situations:
  Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
  {'\n'}
  3. HOW LONG DO WE KEEP YOUR INFORMATION?
  In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.
  We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than 90 days.
  When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
  {'\n'}
  4. HOW DO WE KEEP YOUR INFORMATION SAFE?
  In Short: We aim to protect your personal information through a system of organizational and technical security measures.
  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our App is at your own risk. You should only access the App within a secure environment.
  {'\n'}
  5. WHAT ARE YOUR PRIVACY RIGHTS?
  In Short: In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
  In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
  If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal, nor will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
  If you are a resident in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
    </Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
  },
  text: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 14,
    paddingLeft: 8
  },
});

export default PrivacyPolicy;