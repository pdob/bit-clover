import { StyleSheet, Dimensions } from 'react-native';

const SIZE = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
    fontSize: 15
  },
  flatlistContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'black'
  },
  flatlistText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'serif',
    paddingLeft: 8
  },   
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%'
  },
  horizontalFlatListTitle: {
    fontSize: 13,
    color: 'white',
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  horizontalFlatListContainer: {
    padding: 12,
    backgroundColor: '#4f5b62',
    margin: 9,
    height: 125,
    width: 125,
    borderRadius: 10,
    overflow: 'hidden'
  },
  horizontalFlatListText: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: 'white'
  },
  indicator: {
    flex: 1,
    backgroundColor: '#263238',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  logo: {
    height: 30,
    width: 150,  
  },
  marketHeaderBar: {
    backgroundColor: 'black',
    width: '100%', 
    flexDirection: 'row', 
    height: 35, 
    justifyContent: 'space-between'
  },
  marketHeaderButtons: {
    backgroundColor: '#263238', 
    padding: 10, 
    borderRadius: 10, 
    justifyContent: 'center',
    width: 75
  },
  marketHeaderButtonText: {
    color: 'white', 
    fontSize: 12, 
    fontWeight: 'bold', 
    textAlign: 'center'
  }, 
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    padding: 10,
    fontFamily: 'sans-serif'
  },
  separator: {
    height: 0.7,
    width: '100%',
    backgroundColor: '#1b1b1c'
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
    justifyContent: 'space-between',
    height: 53,
    width: '100%'
  },  
  settingsContainer: {
    backgroundColor: '#263238',
    flex: 1,
    padding: 10
  },
  settingsHeading: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 10
  },
  settingsModal: {
    backgroundColor: 'black',
    paddingLeft: 10,
    paddingRight: 10,
    height: SIZE.height,
    opacity: 1
  },
  settingsModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#263238',
    borderRadius: 5,
    justifyContent: 'space-between',
    height: 53,
    width: '100%'
  },
  settingsModalCloseButton: {
    backgroundColor: '#263238',
    width: 80,
    padding: 8,
    marginLeft: SIZE.width - 100,
    borderRadius: 10,
  },  
  settingsValue: {
    color: '#b6bab8',
    fontFamily: 'serif',
    fontSize: 15,
    paddingRight: 10
  },
  settingsSubheading: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10
  }
});

export const infoStyles = StyleSheet.create({
  chart: {
    backgroundColor: 'black',
    justifyContent: 'center'    
  },
  chartAxisLabels: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },

  coinTitle: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 15,
  },
  coinTitleContainer: {
    padding: 10
  },  
  coinPrice: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 35
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    height: 50,
  },
  headerBack: {
    height: 30,
    width: 30,
    marginLeft: 5,
    marginRight: 10
  },
  headerLogo: {
    height: 30,
    width: 30,
    marginRight: 8
  },
  headerTitle: {
    fontSize: 20,
    color: 'white'
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statsContainer: {
    padding: 10
  },
  statsText: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 15,
    paddingBottom: 5
  },  
  statsTitle: {
    color: 'white',
    fontSize: 23,
    fontFamily: 'serif',
    paddingBottom: 5,
  }, 

});


export default styles;