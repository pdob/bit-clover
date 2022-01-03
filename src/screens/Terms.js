import React from 'react';
import { ScrollView, Text, StyleSheet } from "react-native";

const Terms = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.text}>
    1. The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.
    {'\n'}  
    2. You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Application, and other users of the Application to use your Contributions in any manner contemplated by the Application and these Terms of Use.
    {'\n'}  
    3. You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness or each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Application and these Terms of Use.
    {'\n'}  
    4. Your Contributions are not false, inaccurate, or misleading.
    {'\n'}  
    5. Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.
    {'\n'}  
    6. Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).
    {'\n'}  
    7. Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.
    {'\n'}  
    8. Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.
    {'\n'}  
    9. Your Contributions do not violate any applicable law, regulation, or rule.
    {'\n'}  
    10. Your Contributions do not violate the privacy or publicity rights of any third party.
    {'\n'}  
    11. Your Contributions do not contain any material that solicits personal information from anyone under the age of 18 or exploits people under the age of 18 in a sexual or violent manner.
    {'\n'}  
    12. Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors. 
    {'\n'}  
    13. Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.
    {'\n'}  
    14. Your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms of Use, or any applicable law or regulation.
    Any use of the Application in violation of the foregoing violates these Terms of Use and may result in, among other things, termination or suspension of your rights to use the Application.
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

export default Terms;