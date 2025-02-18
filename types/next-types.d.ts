import { Metadata } from 'next'

export type PageProps = {
  params: { 
    lessonId: string 
  } & Promise<{
    then: () => void;
    catch: () => void;
    finally: () => void;
    [Symbol.toStringTag]: string;
  }>
}

export type GenerateMetadataProps = {
  params: { 
    lessonId: string 
  } & Promise<{
    then: () => void;
    catch: () => void;
    finally: () => void;
    [Symbol.toStringTag]: string;
  }>
}
