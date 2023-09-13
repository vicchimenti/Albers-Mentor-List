  /***
*     @author Victor Chimenti, MSCS
*     @file v9-fulltext.js
*           Albers Mentor List
*           ID: 364
*           v9/fulltext
*
*     This content type will work in conjunction with the Organizer Zone-A
*     and each item will contain one searchable, article.
*
*     Document will write once when the page loads
*
*     @version 8.1
*/









    /***
     *      Import T4 Utilities
     */
    importClass(com.terminalfour.media.IMediaManager);
    importClass(com.terminalfour.spring.ApplicationContextProvider);
    importClass(com.terminalfour.publish.utils.BrokerUtils);
    importClass(com.terminalfour.media.utils.ImageInfo);




   /***
    *  Set defaults
    * 
    * */
    let endingHTML = '</div>';
    let openArticle = '<article class="mentorBioWrapper standardContent">';
    let closeArticle = '</article>';
    let openSummaryWrapper = '<div class="mentorBioSummaryWrapper">';
    let closeSummaryWrapper = '</div>';
    let openImageWrapper = '<div class="mentorBioPhoto">';
    let closeImageWrapper = '</div>';
    let openSummary = '<p class="mentorBioSummary">';
    let closeSummary = '</p>';





    /***
     *      Extract values from T4 element tags
     *      and confirm valid existing content item field
     */
    function getContentValues(tag) {

        try {
            let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim();

            return {
                isError: false,
                content: _tag != '' ? _tag : null 
            };

        } catch (error) {

            return {
                isError: true,
                message: error.message
            };
        }
    }




    /***
     *        Returns a formatted unordered list
     */
    function assignList(tags) {

       let arrayofTags = tags.split(',');
       let listValues = '';

       for (let tag = 0; tag < arrayofTags.length; tag++) {
           
           listValues += '<li class="tag">' + arrayofTags[tag].trim() + '</li>';
       }

       return '<div class="knowledgeBaseItem tags"><ul class="categories">' + listValues + '</ul></div>';
    }




   /***
    *      Returns an array of list items
    */
    function assignLinkList(arrayOfValues) {

       let listValues = '';
       for (let i = 0; i < arrayOfValues.length; i++) {

           if (arrayOfValues[i]) {

               listValues += '<li class="linkListItem list-group-item d-inline p-0 pe-md-4">' + arrayOfValues[i] + '</li>';
           }
       }

       return listValues;
    }




   /***
    *      Parses array values for null
    */
    function parseArray(rawValues) {

       let results = [];
       for (let value in rawValues) {

           if (rawValues[value]) results.push(rawValues[value]);
       }

       return results;
    }




    /***
     *      Returns a media object
     */
    function getMediaInfo(mediaID) {

        let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
        let media = mediaManager.get(mediaID, language);

        return media;
    }




    /***
     *      Returns a media stream object
     */
    function readMedia(mediaID) {

        let mediaObj = getMediaInfo(mediaID);
        let oMediaStream = mediaObj.getMedia();

        return oMediaStream;
    }




   /***
     *      Returns a formatted html img tag
     */
    function imageTag(itemId) {

       let mediaPath = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="media" formatter="path/*" id="' + itemId + '" />');
       let mediaInfo = getMediaInfo(itemId);
       let media = readMedia(itemId);
       let info = new ImageInfo();
       info.setInput(media);

       let imageHTML = (info.check()) ?
           '<figure class="figure"><img src="' + mediaPath + '" class="figure-img img-fluid" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" /></figure>' :
           '<figure class="d-none hidden visually-hidden"><span class="class="visually-hidden hidden">Invalid Image ID</span></figure>';

       return imageHTML;
    }




    /***
     *      Write the document
     */
    function writeDocument(array) {

        for (let i = 0; i < array.length; i++) {

            document.write(array[i]);
        }
    }




try {



   /***
    *      Dictionary of content
    * */
   let mentorDict = {

       contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
       firstName: getContentValues('<t4 type="content" name="First Name" output="normal" modifiers="striptags,htmlentities" />'),
       lastName: getContentValues('<t4 type="content" name="Last Name" output="normal" modifiers="striptags,htmlentities" />'),
       fullName:getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
       jobTitle: getContentValues('<t4 type="content" name="Job Title" output="normal" modifiers="striptags,htmlentities" />'),
       company: getContentValues('<t4 type="content" name="Company" output="normal" modifiers="striptags,htmlentities" />'),
       industry: getContentValues('<t4 type="content" name="Industry" output="normal" modifiers="striptags,htmlentities" />'),
       mentorSince: getContentValues('<t4 type="content" name="Mentor Since" output="normal" modifiers="striptags,htmlentities" />'),
       linkedIn: getContentValues('<t4 type="content" name="LinkedIn Profile Link" output="normal" modifiers="striptags,htmlentities" />'),
       jobDescription: getContentValues('<t4 type="content" name="Job Description" output="normal" modifiers="medialibrary,nav_sections" />'),
       companyDescription: getContentValues('<t4 type="content" name="Company Description" output="normal" modifiers="medialibrary,nav_sections" />'),
       employmentHistory: getContentValues('<t4 type="content" name="Employment History" output="normal" modifiers="medialibrary,nav_sections" />'),
       education: getContentValues('<t4 type="content" name="Education" output="normal" modifiers="medialibrary,nav_sections" />'),
       civicInvolvement: getContentValues('<t4 type="content" name="Civic Involvement" output="normal" modifiers="medialibrary,nav_sections" />'),
       objectives: getContentValues('<t4 type="content" name="Mentoring Objectives and Scope" output="normal" modifiers="medialibrary,nav_sections" />'),
       additionalInfo: getContentValues('<t4 type="content" name="Additional Information" output="normal" modifiers="medialibrary,nav_sections" />'),
       yourMeetings: getContentValues('<t4 type="content" name="Your Meetings" output="normal" modifiers="medialibrary,nav_sections" />'),
       whenAndWhere: getContentValues('<t4 type="content" name="When and where do you hold meetings with your " output="normal" modifiers="medialibrary,nav_sections" />'),
       studentType: getContentValues('<t4 type="content" name="Student Type" output="normal" modifiers="striptags,htmlentities" />'),
       willMentor: getContentValues('<t4 type="content" name="Will Mentor" output="normal" display_field="value" />'),
       imageId: getContentValues('<t4 type="content" name="Image ID" output="normal" modifiers="striptags,htmlentities" />'),
       photo: getContentValues('<t4 type="content" name="Photo" output="image" alt="name" />'),
       lastModified: getContentValues('<t4 type="meta" meta="last_modified" format="EEEE, MMMM d, yyyy" />'),
       anchor: getContentValues('<t4 type="meta" meta="html_anchor" />'),
       contentId: getContentValues('<t4 type="meta" meta="content_id" />')

   };




   /***
    *  Set wrapper
    * 
    * */
   let beginningHTML = (mentorDict.contentId.content) ?
        '<div class="mentorWrapper" id="' + mentorDict.contentId.content + '" data-position-default="ZoneA" data-position-selected="ZoneA">' :
        '<div class="d-none mentorWrapper hidden visually-hidden">';




    /***
    *  Name String
    * 
    * */
   let nameString = (mentorDict.firstName.content && mentorDict.lastName.content) ?
        '<h1 id="pageTitle">' + mentorDict.firstName.content + ' ' + mentorDict.lastName.content + '</h1>' :
        (mentorDict.fullName.content) ?
        '<h1 id="pageTitle">' + mentorDict.fullName.content + '</h1>' :
        (mentorDict.firstName.content) ?
        '<h1 id="pageTitle">' + mentorDict.firstName.content + '</h1>' :
        (mentorDict.lastName.content) ?
        '<h1 id="pageTitle">' + mentorDict.lastName.content + '</h1>' :
        (mentorDict.contentName.content) ?
        '<h1 id="pageTitle">' + mentorDict.contentName.content + '</h1>' :
        '<span class="d-none hidden visually-hidden">No valid name entered</span>';




   /***
    *  Job Title
    * 
    * */
   let jobTitleString = (mentorDict.jobTitle.content) ?
        '<strong>Job Title: </strong>' + mentorDict.jobTitle.content + '<br>' :
        '<span class="jobTitle d-none hidden visually-hidden">No job title entered</span>';




    /***
    *  Company
    * 
    * */
   let companyString = (mentorDict.company.content) ?
   '<strong>Company: </strong>' + mentorDict.company.content + '<br>' :
   '<span class="company d-none hidden visually-hidden">No company entered</span>';




    /***
    *  Industry
    * 
    * */
    let industryString = (mentorDict.industry.content) ?
       '<strong>Industry: </strong>' + mentorDict.industry.content + '<br>' :
       '<span class="industry d-none hidden visually-hidden">No industry entered</span>';




    /***
    *  Mentor Since
    * 
    * */
    let mentorSinceString = (mentorDict.mentorSince.content) ?
    '<strong>Mentor Since: </strong>' + mentorDict.mentorSince.content + '<br>' :
    '<span class="mentorSince d-none hidden visually-hidden">No mentor time entered</span>';




    /***
    *  Student Type
    * 
    * */
    let studentTypeString = (mentorDict.studentType.content) ?
        '<strong>Will Mentor: </strong>' + mentorDict.studentType.content + '<br>' :
        (mentorDict.willMentor.content) ? assignList(mentorDict.willMentor.content) :
        '<span class="studentType d-none hidden visually-hidden">No studentType entered</span>';




    /***
    *  LinkedIn Profile
    * 
    * */
    let linkedInString = (mentorDict.linkedIn.content) ?
        '<a href="' + mentorDict.linkedIn.content + '" target="_blank" title="LinkedIn Profile"><span class="fab fa-linkedin" aria-hidden="true"></span> Profile</a>' :
        '<span class="linkedIn d-none hidden visually-hidden">No LinkedIn profile entered</span>';









   /***
    *  Description
    * 
    * */
   let fullBodyString = (mentorDict.articleFullBody.content) ?
   '<div class="articleFullbody card-text">' + mentorDict.articleFullBody.content + '</div>' :
   '<span class="articleFullbody d-none hidden visually-hidden">No content entered</span>';




   /***
    *  Subtitle subhead
    * 
    * */
   let subtitleString = (mentorDict.articleSubtitle.content) ?
       '<p class="articleSubtitle card-text"><strong>' + mentorDict.articleSubtitle.content + '</strong></p>' :
       '<span class="articleSubtitle d-none hidden visually-hidden">No subtitle entered</span>';




   /***
    *  Section/Content Link
    * 
    * */
   let contentLinkString = (mentorDict.linkSource.content && mentorDict.linkText.content) ?
       '<span class="externalLink card-text"><a href="' + mentorDict.linkSource.content + '" class="card-link" title="Visit the site: ' + mentorDict.linkText.content + '" target="_blank">' + mentorDict.linkText.content + '</a></span>' :
       null;
   



   /***
    *  Format Last Modified
    * 
    * */
   let lastModifiedString = (mentorDict.lastModified.content) ?
         '<div class="lastModified"><p class="text-muted">Last Modified: <em>' + mentorDict.lastModified.content + '</em></p></div>' :
         '<span class="lastModified d-none hidden visually-hidden">No Last Modified Date Found</span>';




   /***
    *  Establish h1
    *  allow editors to hide the fulltext link when no full body exists
    * 
    * */
    let titleLink = (mentorDict.articleTitle.content) ?
       '<h1 class="card-title">' + mentorDict.articleTitle.content + '</h1>' :
       '<h1 class="card-title">' + mentorDict.contentName.content + '</h1>';




   /***
    *  Process Media Library PDF File
    * 
    * */
    let mediaFileId = (mentorDict.mediaFile.content) ? content.get('Media File').getID() : null;
    let mediaFileString = (mediaFileId) ? mediaTag(mediaFileId) : null;




   /***
    *  Process Image
    * 
    * */
   let imageString = (mentorDict.imageId.content) ?
        imageTag(mentorDict.imageId.content) :
        (mentorDict.photo.content) ?
        '' + mentorDict.photo.content + '' :
        '<span class="articleImage d-none hidden visually-hidden">No valid image provided</span>';






   /***
    *  Parse and format list items
    * 
    * */
   let topicString = (mentorDict.topics.content) ?
       assignList(mentorDict.topics.content) :
       '<span class="knowledgeBaseItem tags d-none hidden visually-hidden">No Topics Provided</span>';




   /***
    *  format content and pdf links
    * 
    * */
   let linkArray = [contentLinkString, mediaFileString];
   let linkList = parseArray(linkArray);
   let formattedLinkList = assignLinkList(linkList);
   let linkString = (formattedLinkList) ?
       '<ul class="linkList d-flex flex-column flex-md-row justify-content-start p-0 m-0">' + formattedLinkList + '</ul>' :
       '<span class="linkList d-none hidden visually-hidden">No Links</span>';
    
   
   

   
   /***
    *  write document once
    * 
    * */
   writeDocument(
       [
           beginningHTML,
           nameString,
           openArticle,
           openSummaryWrapper,
           openImageWrapper,
           imageString,
           closeImageWrapper,
           openSummary,
           jobTitleString,



           closeSummary,
           closeSummaryWrapper,

           closeArticle,
           endingHTML
       ]
   );
 
 
   
 
 } catch (err) {
   document.write(err.message);
 }
 