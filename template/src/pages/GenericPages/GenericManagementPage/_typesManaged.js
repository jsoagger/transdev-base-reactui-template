export default {
    items: [
    	{
            displayName: 'Account',
            businessClass: 'io.github.nexitia.transdev.base.model.people.account.UserAccount',
            rootType: 'io.github.jsoagger.auth.Account'
        },
        {
            displayName: 'Element',
            businessClass: 'io.github.nexitia.transdev.part.model.Element',
            rootType: 'io.github.jsoagger.Element'
        },
        {
            displayName: 'Document',
            businessClass: 'io.github.nexitia.transdev.document.model.Document',
            rootType: 'io.github.jsoagger.doc.Document'
        },
        {
            displayName: 'Identification',
            businessClass: 'io.github.nexitia.transdev.multiIdentifiable.model.Identification',
            rootType: 'io.github.jsoagger.id.Identification'
        },
        {
            displayName: 'Container',
            businessClass: 'io.github.nexitia.transdev.base.model.composite.Container',
            rootType: 'io.github.jsoagger.Container'
        },
        {
            displayName: 'Product instance',
            businessClass: 'io.github.nexitia.transdev.shopbase.model.ProductInstance',
            rootType: 'io.github.jsoagger.product.ProductInstance'
        },
        {
            displayName: 'Category',
            businessClass: 'io.github.nexitia.transdev.classifiable.model.ObjectCategory',
            rootType: 'io.github.jsoagger.classification.Category'
        },
        {
            displayName: 'Contact mechanism',
            businessClass: 'io.github.nexitia.transdev.contactable.model.ContactMechanism',
            rootType: 'io.github.jsoagger.contact.ContactMechanism'
        },
        {
            displayName: 'Product catalog',
            businessClass: 'io.github.nexitia.transdev.catalog.model.ObjectCatalog',
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
            businessClass: 'io.github.nexitia.transdev.people.model.Party',
            rootType: 'io.github.jsoagger.people.Party'
        },
        {
            displayName: 'Organization',
            businessClass: 'io.github.nexitia.transdev.people.model.organisation.Organization',
            rootType: 'io.github.jsoagger.people.Party/Organisation'
        },
        {
            displayName: 'Person',
            businessClass: 'io.github.nexitia.transdev.people.model.person.Person',
            rootType: 'io.github.jsoagger.people.Party/Person'
        },
        {
            displayName: 'Product to Catalog (Link)',
            businessClass: 'io.github.nexitia.transdev.shopbase.model.ProductInstanceObjectCatalogLink',
            rootType: 'io.github.jsoagger.objectLink.ProductInstanceCatalogLink'
        },
        {
            displayName: 'Product to Category (Link)',
            businessClass: 'io.github.nexitia.transdev.shopbase.model.ProductInstanceCategoryClassification',
            rootType: 'io.github.jsoagger.objectLink.ProductInstanceCategoryLink'
        },
        {
            displayName: 'Element to Element master (Link)',
            businessClass: 'io.github.nexitia.transdev.part.model.ElementToElementMasterLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToElementMasterLink'
        },
        {
            displayName: 'Element to Element (Link)',
            businessClass: 'io.github.nexitia.transdev.part.model.ElementToElementLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToElementLink'
        },
        {
            displayName: 'Element to Document master (Link)',
            businessClass: 'io.github.nexitia.transdev.pdm.model.ElementToDocumentMasterLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToDocumentMasterLink'
        },
        {
            displayName: 'Element to Document (Link)',
            businessClass: 'io.github.nexitia.transdev.pdm.model.ElementToDocumentLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToDocumentLink'
        },
        {
            displayName: 'Document to Document master (Link)',
            businessClass: 'io.github.nexitia.transdev.document.model.DocumentDocMasterLink',
            rootType: 'io.github.jsoagger.objectLink.DocumentToDocumentMasterLink'
        },
        {
            displayName: 'Document to Document (Link)',
            businessClass: 'io.github.nexitia.transdev.document.model.DocumentDocumentLink',
            rootType: 'io.github.jsoagger.objectLink.DocumentToDocumentLink'
        },
    ],
}