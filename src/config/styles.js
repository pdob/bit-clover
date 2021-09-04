import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
    fontSize: 15
  },
  flatlistContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#4f5b62',
    marginLeft: 10,
    marginRight: 10
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
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    padding: 10,
    fontFamily: 'sans-serif'
  },
  separator: {
    height: 0.7,
    width: '100%',
    backgroundColor: '#263238'
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
    fontSize: 15,
    paddingBottom: 4
  },  
  statsTitle: {
    color: 'white',
    fontSize: 23,
    fontFamily: 'serif',
    paddingBottom: 5,
  }, 

});


export default styles;