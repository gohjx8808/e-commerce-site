import { BLOCKS, Block, Inline, MARKS } from "@contentful/rich-text-types";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line import/prefer-default-export
export const richTextRendererOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => (
      <Typography variant="h6" fontWeight="bold">
        {text}
      </Typography>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: React.ReactNode) => (
      <Typography variant="h6">{children}</Typography>
    ),
  },
};
