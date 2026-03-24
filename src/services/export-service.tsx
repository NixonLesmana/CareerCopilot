import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    color: "#102038",
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  body: {
    lineHeight: 1.5,
  },
});

export async function renderArtifactPdf(title: string, body: string[]) {
  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {body.map((section, index) => (
          <View style={styles.section} key={`${title}-${index}`}>
            <Text style={styles.body}>{section}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  return renderToBuffer(doc);
}
