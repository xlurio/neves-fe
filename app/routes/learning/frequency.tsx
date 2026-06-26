import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function FrequencyRoute() {
  return (
    <Box>
      <Typography variant="h2">How and why to memorize radicals?</Typography>
      <Typography variant="body1">
        Studying is one of those tasks where “work smarter, not harder” makes
        the most sense, and learning a new language is no different. (Miles,
        2014) shows that studying sparsely tends to improve our retention on the
        longer run compared with lengthy uninterrupted sessions. For example,
        three 10-min sessions spread along days or weeks tend to result in
        better retention than a single 30-min session.
      </Typography>
      <Typography variant="h3">References</Typography>
      <Typography variant="body1">
        <ol>
          <li>
            Miles, S. W. (2014). Spaced vs. Massed distribution instruction for
            L2 grammar learning. System, 42, 412-428.
            https://doi.org/10.1016/j.system.2014.01.014
          </li>
        </ol>
      </Typography>
    </Box>
  );
}
