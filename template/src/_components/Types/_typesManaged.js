export default {
    items: [
    	{
            displayName: 'Account',
            businessClass: 'io.github.jsoagger.core.people.account.UserAccount',
            rootType: 'io.github.jsoagger.auth.Account'
        },
        {
            displayName: 'Element',
            businessClass: 'io.github.jsoagger.core.part.Element',
            rootType: 'io.github.jsoagger.Element'
        },
        {
            displayName: 'Document',
            businessClass: 'io.github.jsoagger.core.document.Document',
            rootType: 'io.github.jsoagger.doc.Document'
        },
        {
            displayName: 'Identification',
            businessClass: 'io.github.jsoagger.core.api.multiIdentifiable.Identification',
            rootType: 'io.github.jsoagger.id.Identification'
        },
        {
            displayName: 'Container',
            businessClass: 'io.github.jsoagger.core.api.composite.Container',
            rootType: 'io.github.jsoagger.Container'
        },
        {
            displayName: 'Product instance',
            businessClass: 'io.github.jsoagger.core.shop.ProductInstance',
            rootType: 'io.github.jsoagger.product.ProductInstance'
        },
        {
            displayName: 'Category',
            businessClass: 'io.github.jsoagger.core.api.classifiable.ObjectCategory',
            rootType: 'io.github.jsoagger.classification.Category'
        },
        {
            displayName: 'Contact mechanism',
            businessClass: 'io.github.jsoagger.core.api.contact.ContactMechanism',
            rootType: 'io.github.jsoagger.contact.ContactMechanism'
        },
        {
            displayName: 'Catalog',
            businessClass: 'io.github.jsoagger.core.shop.ObjectCatalog',
            rootType: 'io.github.jsoagger.Catalog'
        },
        {
            displayName: 'Product Order',
            businessClass: 'io.github.jsoagger.core.shop.Command',
            rootType: 'io.github.jsoagger.shop.Order'
        },
        {
            displayName: 'Order',
            businessClass: 'io.github.jsoagger.core.shop.Command',
            rootType: 'io.github.jsoagger.shop.Order'
        },
        {
            displayName: 'Party',
            businessClass: 'io.github.jsoagger.core.people.Party',
            rootType: 'io.github.jsoagger.people.Party'
        },
        {
            displayName: 'Organization',
            businessClass: 'io.github.jsoagger.core.people.model.organisation.Organization',
            rootType: 'io.github.jsoagger.people.Party/Organisation'
        },
        {
            displayName: 'Person',
            businessClass: 'io.github.nexitia.transdev.people.model.person.Person',
            rootType: 'io.github.jsoagger.people.Party/Person'
        },
        {
            displayName: 'Product to Catalog (Link)',
            businessClass: 'io.github.jsoagger.core.shop.ProductInstanceObjectCatalogLink',
            rootType: 'io.github.jsoagger.objectLink.ProductInstanceCatalogLink'
        },
        {
            displayName: 'Product to Category (Link)',
            businessClass: 'io.github.jsoagger.core.shop.ProductInstanceCategoryClassification',
            rootType: 'io.github.jsoagger.objectLink.ProductInstanceCategoryLink'
        },
        {
            displayName: 'Element to Element master (Link)',
            businessClass: 'io.github.jsoagger.core.part.ElementToElementMasterLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToElementMasterLink'
        },
        {
            displayName: 'Element to Element (Link)',
            businessClass: 'io.github.jsoagger.core.part.ElementToElementLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToElementLink'
        },
        {
            displayName: 'Element to Document master (Link)',
            businessClass: 'io.github.jsoagger.core.part.ElementToDocumentMasterLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToDocumentMasterLink'
        },
        {
            displayName: 'Element to Document (Link)',
            businessClass: 'io.github.jsoagger.core.part.ElementToDocumentLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToDocumentLink'
        },
        {
            displayName: 'Document to Document master (Link)',
            businessClass: 'io.github.jsoagger.core.document.DocumentDocMasterLink',
            rootType: 'io.github.jsoagger.objectLink.DocumentToDocumentMasterLink'
        },
        {
            displayName: 'Document to Document (Link)',
            businessClass: 'io.github.jsoagger.core.document.DocumentDocumentLink',
            rootType: 'io.github.jsoagger.objectLink.DocumentToDocumentLink'
        },
    ],
}