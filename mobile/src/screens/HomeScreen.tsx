import { Text, View, StyleSheet } from 'react-native';
import { brandConfig, copyBlocks } from '@nectar-sweet/shared';
import { Screen } from '../components/Screen';

export const HomeScreen = () => {
  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.title}>{brandConfig.brandName}</Text>
        <Text style={styles.subtitle}>{copyBlocks.heroTitle}</Text>
        <Text style={styles.description}>{copyBlocks.heroSubtitle}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Trust pillars</Text>
        {brandConfig.trustPillars.map((pillar) => (
          <Text key={pillar} style={styles.line}>
            • {pillar}
          </Text>
        ))}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  hero: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 8 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 20, fontWeight: '600' },
  description: { color: '#5f5b54' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  line: { color: '#5f5b54' }
});
