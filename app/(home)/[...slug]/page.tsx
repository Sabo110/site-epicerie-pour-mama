"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getOSC } from '@/actions/subCategory'
import { getOSSC } from '@/actions/sous-sous-category'
import { Skeleton } from '@/components/ui/skeleton'
import { getOC } from '@/actions/category'
import { Banner } from '../_components/Banner'
import { ProductsSkeleton } from '../_components/products-skeleton'
import { Products } from '@/components/Products'
import { CustomTitle } from '../_components/custom-title'
import { BannerSkeleton } from '@/components/bannerSkeleton'
import { BanSkeleton } from '../_components/banner-skeleton'
import { Error } from '../_components/error'

export default function page() {
    const baseUrl = "https://res.cloudinary.com/dilxbtgss/image/upload/v1731642136/"
    const params = useParams<{ slug: string[] }>()
    //on recupere d'evantuele slug
    const categorySlug = params.slug[0]
    const subCategorySlug = params.slug[1]
    const subSubCategorySlug = params.slug[2]
    //recuperation d'une categorie a partir du slug
    const categoryQuery = useQuery({
        queryKey: ['categorie', categorySlug],
        queryFn: () => getOC(categorySlug)
    })
    //recupereation d'une sous categorie a paritir de son slug
    // const subCategoryQuery = useQuery({
    //     queryKey: ['subCategorie', params.slug[1]],
    //     queryFn: () => getOSC(params.slug[1]),
    //     enabled: (subCategorySlug && !subSubCategorySlug) ? true : false
    // })
    //recuperation d'une sous sous categorie a partir de son slug
    // const subSubCategoryQuery = useQuery({
    //     queryKey: ['subSubCategorie', params.slug[2]],
    //     queryFn: () => getOSSC(params.slug[2]),
    //     enabled: subSubCategorySlug ? true : false
    // })
    return (
        // <div className=''>
        //     {/* le skeleton de la baniere et banniere */}
        //     {categoryQuery.isPending ? <Skeleton className='w-full md:h-[350px] h-[200px]' /> : null}
        //     {categoryQuery.data ? 
        //     <div className="relative">
        //         <Banner banner={baseUrl + categoryQuery.data.imageUrl} />
        //         <div className="bg-gray-50 p-4 rounded shadow absolute left-4 bottom-4">
        //             {categoryQuery.data.name}
        //         </div>
        //     </div>
        //      : null
        //     }
        //     {/* le skeleton du nom de la sous categorie ou sous-sous categorie et sous categorie ou sous sous categorie */}
        //     {(subCategoryQuery.isPending && subSubCategoryQuery.isPending && categoryQuery.isPending) ? <Skeleton className='sm: w-1/2 mx-auto h-5' /> : null}
        //     {subCategoryQuery.data ? <CustomTitle><h5> {subCategoryQuery.data.name} </h5></CustomTitle> : subSubCategoryQuery.data ? <CustomTitle><h5> {subSubCategoryQuery.data.name} </h5></CustomTitle> : null}
        //     {/* skeleon de produits */}
        //     {((subCategoryQuery.isPending && !subCategoryQuery.data && !subCategoryQuery.error) && (subSubCategoryQuery.isPending && !subSubCategoryQuery.data && !subSubCategoryQuery.error) && categoryQuery.isPending) ? <ProductsSkeleton /> : null}
        //     {/* produits */}
        //     {
        //         subCategoryQuery.data ?
        //             <Products products={subCategoryQuery.data.products.filter(item => item.visible === true)} />
        //             : subSubCategoryQuery.data ?
        //                 <Products products={subSubCategoryQuery.data.products.filter(item => item.visible === true)} /> :
        //                 null
        //     }
        //     {
        //         // si j'ai recupere une categorie et que les requettes de recuperation subcategorie et subsubcategorie sont inactif alors
        //         // (une requette desactiver aura toujours sont ispending a true donc il faut combiner avec un data et error pour savoir si la requette est desactiver)
        //         (categoryQuery.data && (subCategoryQuery.isPending && !subCategoryQuery.data && !subCategoryQuery.error) && (subSubCategoryQuery.isPending && !subSubCategoryQuery.data && !subSubCategoryQuery.error)) ?
        //             // je parcours les sous categorie de cette categorie
        //             categoryQuery.data.subCategories.filter(sc => sc.visible === true).map(sc => (
        //                 // pour chaque sous categorie si la taille de produits associe est superieur a 0 alors on affiche les produits
        //                 sc.products.length > 0 ?
        //                     <div>
        //                         <CustomTitle><h5> {sc.name} </h5></CustomTitle>
        //                         <Products products={sc.products.filter(item => item.visible === true)} />
        //                     </div> :
        //                     // sinon on parours les sous categories de cette sous categorie et on affiche les produits pour chaque sous categorie de cette sous categorie
        //                     sc.subSubCategories.filter(ssc => ssc.visible === true).map(ssc => (
        //                         <div>
        //                             <CustomTitle><h5> {ssc.name} </h5></CustomTitle>
        //                             <Products products={ssc.products.filter(item => item.visible === true)} />
        //                         </div>

        //                     ))
        //             )) : <ProductsSkeleton />

        //     }
        // </div>
        <div className=''>
            {categoryQuery.error ? <Error  fn={categoryQuery.refetch}/> : null}
            {/* affichage skeleton de la bannire la banniere */}
                {
                    categoryQuery.isPending ? <BanSkeleton /> : null
                }
            {/* affichage de la bannire */}
                {
                    categoryQuery.data ? 
                    <Banner banner={baseUrl + categoryQuery.data.imageUrl} /> 
                    : null
                }
            {/* affichage du skeleton pour le nom de la sous categorie ou sous sous categorie */}
            {
                categoryQuery.isPending ? <Skeleton className='h-8 w-full mb-3'/> : null

            }
            {/* premier cas nous n'avons que le slug d'une categorie fournit */}
                {/* on parcous les sous categories de cette categoie et pour chacune si nous avons des produits on les affiches precedé du name de la sous categorie en question
                sinon pour cette sous categorie en question on parcours sont tableau de sous sous categorie et pour chaque sous categorie on affiche les produits precedé du nom de la sous sous categorie
                */}
                {
                    categoryQuery.data && !subCategorySlug && !subSubCategorySlug ?
                    categoryQuery.data?.subCategories.filter(sc => sc.visible === true).map(sc => (
                        sc.products.length > 0 ? 
                        <div key={sc.id} className='space-y-6 mb-8'>
                            <CustomTitle><h5> {sc.name} </h5></CustomTitle>
                            <Products products={sc.products.filter(p => p.visible === true)}/>
                        </div>:
                        sc.subSubCategories.filter(ssc => ssc.visible === true).map(ssc => (
                            <div key={ssc.id} className='space-y-6 mb-8'>
                                <CustomTitle><h5> {ssc.name} </h5></CustomTitle>
                                <Products products={ssc.products.filter(p => p.visible === true)}/>
                            </div>
                        ))
                    )) : null
                }
                {/* on affiche le skeleton de chargement pour les produits  ce skeleton sera utilise pour tous les cas*/}
                {
                    categoryQuery.isPending ? <ProductsSkeleton /> : null
                }
            {/* 2eme cas j'ai en plus du slug de la categorie le slug de la sous categorie */}
                {/* je recupere la sous categorie a partir de son slug et j'affiche ses produits */}
                {
                    categoryQuery.data && subCategorySlug && !subSubCategorySlug ?
                    <div className='space-y-6'>
                        <CustomTitle><h5> {categoryQuery.data.subCategories.find(sc => sc.slug === subCategorySlug)!.name} </h5></CustomTitle>
                        <Products  products={categoryQuery.data.subCategories.find(sc => sc.slug === subCategorySlug)!.products.filter(p => p.visible === true)}/>
                    </div> : 
                    categoryQuery.data && subCategorySlug && subSubCategorySlug ? 
                    // je recupere la sous sous categorie a partir du tableau de sous sous  categorie de la sous categorie recuperé et j'affiche ses produits precedé de son nom
                    <div className='space-y-6'>
                        <CustomTitle><h5> {categoryQuery.data.subCategories.find(sc => sc.slug === subCategorySlug)!.subSubCategories.find(ssc => ssc.slug === subSubCategorySlug)!.name} </h5></CustomTitle>
                        <Products products={categoryQuery.data.subCategories.find(sc => sc.slug === subCategorySlug)!.subSubCategories.find(ssc => ssc.slug === subSubCategorySlug)!.products.filter(p => p.visible === true)}/>
                    </div>: null
                }
        </div>
    )
}
