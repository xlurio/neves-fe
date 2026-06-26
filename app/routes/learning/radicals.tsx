import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function RadicalsRoute() {
  return (
    <Box>
      <Typography variant="h2">How and why to memorize radicals?</Typography>
      <Typography variant="body1">
        Chinese writing system follows a morphosyllabic system, where each
        character represents a <Link href="#morpheme">morpheme</Link>. Most of
        its characters are composed by simpler characters called radicals. More
        than 80% are composed as a radical-phonetic compound. In those
        radical-phonetic compounds, one left radical hints the semantic class of
        the character and one right radical hints its pronunciation. (Chen et
        al., 2021; Kuo et al., 2024) show that{" "}
        <Link href="#radical-awareness">radical awareness</Link> is related to
        the capability of reading comprehension in Chinese.
      </Typography>
      <Typography variant="h3">Glossary</Typography>
      <Typography id="morpheme" variant="h4">
        morpheme
      </Typography>
      <Typography variant="body1">
        Smallest meaningful unit of a language such as the root of Latin-derived
        words.
      </Typography>
      <Typography id="radical-awareness" variant="h4">
        radical awareness
      </Typography>
      <Typography variant="body1">
        Ability to:{" "}
        <ul>
          <li>
            De-compound characters into radicals and extracting information from
            that;
          </li>
          <li>Compose words from combining radicals.</li>
        </ul>
      </Typography>
      <Typography variant="h3">References</Typography>
      <Typography variant="body1">
        <ol>
          <li>
            Chen, T., Ke, S., & Koda, K. (2021). The predictive role of
            grapho-morphological knowledge in reading comprehension for
            beginning-level L2 Chinese learners. Frontiers in Psychology, 12,
            757934.
          </li>
          <li>
            Kuo, L.-J., Ku, Y.-M., Chen, Z., & Shih, C.-Y. (2024). Acquisition
            of Chinese characters: The impact of character properties and the
            contribution of individual differences. Applied Psycholinguistics,
            45(6), 1114–1146. https://doi.org/10.1017/S0142716424000420
          </li>
        </ol>
      </Typography>
    </Box>
  );
}
