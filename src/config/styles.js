import { StyleSheet, Dimensions } from 'react-native';

const SIZE = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  flatlistText: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 14,
    paddingLeft: 8
  },
  flatlistSubheading: {
    color: '#b6bab8', 
    fontFamily: 'serif',
    fontSize: 12,
    fontWeight: 'bold' 
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
    color: 'white',
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  horizontalFlatListContainer: {
    backgroundColor: '#4f5b62',
    borderRadius: 15,
    height: 130,
    margin: 9,
    overflow: 'hidden',
    padding: 12,
    width: 130
  },
  horizontalFlatListText: {
    color: 'white',
    fontFamily: 'serif',
    fontSize: 16,
    paddingTop: 10
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#263238',
    justifyContent: 'center'
  }, 
  logo: {
    height: 30,
    width: 150,  
  },
  marketHeaderBar: {
    backgroundColor: 'black',
    flexDirection: 'row', 
    height: 35, 
    justifyContent: 'space-between',
    width: '100%'
  },
  marketHeaderButtons: {
    backgroundColor: '#263238', 
    borderRadius: 15, 
    justifyContent: 'center',
    marginLeft: 20,
    padding: 10, 
    width: 75
  },
  marketHeaderButtonText: {
    color: 'white', 
    fontSize: 12, 
    fontWeight: 'bold', 
    textAlign: 'center'
  },
  marketPercentMenu: {
    backgroundColor: '#263238', 
    borderRadius: 10, 
    height: 180, 
    marginLeft: SIZE.width - 75,
    width: 80
  },
  marketSortMenu: {
    backgroundColor: '#263238', 
    borderRadius: 10, 
    height: 250, 
    marginLeft: 20,
    width: 80 
  },
  marketTextInput: {
    backgroundColor: '#263238',
    borderRadius: 15, 
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 12,
    fontWeight: 'bold',
    height: 35, 
    marginLeft: SIZE.width / 2 - 50,
    position: 'absolute',
    textAlign: 'center',
    width: 120 
  },  
  sectionTitle: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  },
  separator: {
    backgroundColor: '#1b1b1c',
    height: 0.7,
    width: '100%'
  },
  settingsButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
    flexDirection: 'row',
    height: 53,
    justifyContent: 'space-between',
    marginBottom: -2,
    width: '100%'
  },  
  settingsContainer: {
    flex: 1,
    backgroundColor: '#263238',
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
    height: SIZE.height,
    opacity: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  settingsModalButton: {
    alignItems: 'center',
    backgroundColor: '#263238',
    borderRadius: 5,
    flexDirection: 'row',
    height: 53,
    justifyContent: 'space-between',
    width: '100%'
  },
  settingsModalCloseButton: {
    backgroundColor: '#263238',
    borderRadius: 10,
    marginLeft: SIZE.width - 85,
    padding: 8,
    width: 70
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
    fontSize: 20
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
    marginLeft: 5,
    marginRight: 10,
    width: 30
  },
  headerLogo: {
    height: 30,
    marginRight: 8,
    width: 30
  },
  headerTitle: {
    color: 'white',
    fontSize: 20
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statsContainer: {
    backgroundColor: 'black',
    padding: 10
  },
  statsText: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 16
  },  
  statsTitle: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 20
  }, 

});


export default styles;