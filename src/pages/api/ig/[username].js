import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { username } = req.query;

  try {
    const resp = await fetch(`https://www.instagram.com/${username}/`);
    const html = await resp.text();
    const $ = cheerio.load(html);
    // Ambil JSON dari <script> window._sharedData
    const sharedDataScript = $('script')
      .filter((i, el) => $(el).html().includes('window._sharedData'))
      .first()
      .html();
    const jsonText = sharedDataScript
      .replace(/^window\._sharedData = /, '')
      .replace(/;$/, '');
    const data = JSON.parse(jsonText);
    // Navigasi ke profil user
    const profile = data.entry_data.ProfilePage[0].graphql.user;

    res.status(200).json({
      username: profile.username,
      fullName: profile.full_name,
      bio: profile.biography,
      profilePic: profile.profile_pic_url_hd,
      media: profile.edge_owner_to_timeline_media.edges.map(edge => ({
        id: edge.node.id,
        thumbnail: edge.node.thumbnail_src,
        link: `https://www.instagram.com/p/${edge.node.shortcode}/`
      })),
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch IG data' });
  }
}
