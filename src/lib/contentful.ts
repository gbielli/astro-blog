import { slugify } from "@/lib/utils";
import type { ContentTypeSys, EntryFieldTypes } from "contentful";
import { createClient } from "contentful";

interface ContentfulAsset {
  contentTypeId: "asset";
  fields: {
    title: string;
    file: {
      url: string;
    };
  };
}

export interface Vendor {
  contentTypeId: "vendor";
  sys: {
    id: string;
  };
  fields: {
    name: string;
    logo: {
      sys: { id: string };
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

// Interface pour la proposition vendeur
export interface VendorProposal {
  contentTypeId: "vendorProposal";
  fields: {
    vendor: EntryFieldTypes.EntryLink<Vendor>;
    price: EntryFieldTypes.Number;
    url: string;
  };
}

// Interface principale pour les Cards
export interface Cards {
  contentTypeId: "cards";
  fields: {
    cardTitle: EntryFieldTypes.Symbol;
    productAdvantages: EntryFieldTypes.Symbol[];
    like?: EntryFieldTypes.Symbol[];
    dislike?: EntryFieldTypes.Symbol[];
    stars?: EntryFieldTypes.Number;
    image?: { fields: ContentfulAsset["fields"] };
    vendorProposal?: {
      fields: VendorProposal["fields"];
      sys: { id: string };
    }[];
  };
}

export interface BlogPost {
  contentTypeId: "blogPost";
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    date: EntryFieldTypes.Date;
    description: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    media?: EntryFieldTypes.AssetLink;
    chapter1: EntryFieldTypes.Text;
    author: EntryFieldTypes.Text;
  };
}

export interface VendorReturn {
  fields: {
    name: string;
    logo: { fields: ContentfulAsset["fields"] };
  };
  sys: {
    id: ContentTypeSys["id"];
  };
}

export async function getVendor(id: string): Promise<VendorReturn | null> {
  try {
    const vendor = await contentfulClient.getEntry<Vendor>(id);
    return {
      fields: {
        name: vendor.fields.name,
        logo: vendor.fields.logo,
      },
      sys: vendor.sys,
    };
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return null;
  }
}

export async function getCategories() {
  const entries = await contentfulClient.getEntries<BlogPost>({
    content_type: "blogPost",
  });

  const uniqueCategories = [
    ...new Set(
      entries.items.map((post) => post.fields.chapter1).filter(Boolean)
    ),
  ];

  return uniqueCategories.map((category) => {
    const categoryTitles: { [key: string]: string } = {
      beaute: "Guide Beauté Pour Homme",
      rasage: "L'Art du Rasage Parfait",
      sport: "Fitness et Performance",
      // Ajoutez d'autres catégories selon vos besoins
    };

    const categoryDescriptions: { [key: string]: string } = {
      beaute:
        "Découvrez nos conseils experts pour prendre soin de votre peau et de votre apparence.",
      rasage: "Maîtrisez les techniques de rasage pour un résultat impeccable.",
      sport: "Atteignez vos objectifs sportifs avec nos conseils d'experts.",
      // Ajoutez d'autres descriptions selon vos besoins
    };

    return {
      name: category,
      path: `/${slugify(category)}`,
      title:
        categoryTitles[category.toLowerCase()] || `Articles sur ${category}`,
      description:
        categoryDescriptions[category.toLowerCase()] ||
        `Découvrez tous nos articles sur ${category}`,
    };
  });
}

export const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
