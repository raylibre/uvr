import type { RegionLeader, RegionLeadershipDTO } from '~/interfaces/regions';


function coalesce<T>(...vals: (T | undefined | null)[]): T | undefined {
  return vals.find(v => v !== undefined && v !== null) as T | undefined;
}

export function normalizeLeadership(items: RegionLeadershipDTO[] = []): RegionLeader[] {
  return items
    .map((raw: any) => {
      const id = coalesce(raw.id, raw.leader_id, raw.member_id);
      const name = coalesce(
        raw.user_name,
        raw.full_name,
        raw.name,
        raw.name_ua,
        raw.name_en,
        [raw.first_name, raw.last_name].filter(Boolean).join(' ').trim() || undefined
      );
      if (!name) return null; // не показуємо запис без імені

      const position = coalesce(
        raw.position_in_government,
        raw.position,
        raw.title,
        raw.position_ua,
        raw.position_en
      );
      const photoUrl = coalesce(raw.photo_url, raw.avatar, raw.image_url, raw.photo);
      const bio = coalesce(raw.short_bio, raw.full_bio, raw.bio, raw.description, raw.about);
      const contactEmail = coalesce(raw.contact_email, raw.user_email, raw.email);
      const contactPhone = coalesce(raw.contact_phone, raw.phone);
      const role = raw.role as string | undefined;

      const leader: RegionLeader = {
        id,
        name,
        position: position || undefined,
        photoUrl: photoUrl ?? null,
        bio: bio ?? null,
        contactEmail: contactEmail ?? null,
        contactPhone: contactPhone ?? null,
        role: role ?? null
      } as RegionLeader;

      return leader;
    })
    .filter(Boolean) as RegionLeader[];
}
