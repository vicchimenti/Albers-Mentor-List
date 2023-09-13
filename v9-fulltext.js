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
*     @version 8.1.1
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
    let background = '<div class="standardContent"><h2>Background</h2></div>';





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
     *        Returns a formatted list
     */
    function assignList(tags) {

       let arrayofTags = tags.split(',');
       let listValues = '';
       let openList = '<strong>Will Mentor: </strong>';
       let closeList = '<br>';

       for (let tag = 0; tag < arrayofTags.length; tag++) {

            if (tag === 0  || tag === (arrayofTags.length-1)) {

                listValues +=  '' + arrayofTags[tag].trim() + '';

            } else {

                listValues +=  '' + arrayofTags[tag].trim() + ', ';
            }  
       }

       return (openList + listValues + closeList);
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
        '<span class="studentType d-none hidden visually-hidden">No student type entered</span>';




    /***
    *  LinkedIn Profile
    * 
    * */
    let linkedInString = (mentorDict.linkedIn.content) ?
        '<a href="' + mentorDict.linkedIn.content + '" target="_blank" title="LinkedIn Profile"><span class="fab fa-linkedin" aria-hidden="true"></span> Profile</a>' :
        '<span class="linkedIn d-none hidden visually-hidden">No LinkedIn profile entered</span>';




   /***
    *  Job Description
    * 
    * */
   let jobDescriptionString = (mentorDict.jobDescription.content) ?
        '<h3>Job Description</h3><p>' + mentorDict.jobDescription.content + '</p>' :
        '<span class="jobDescription d-none hidden visually-hidden">No job description entered</span>';




    /***
    *  Company Description
    * 
    * */
   let companyDescriptionString = (mentorDict.companyDescription.content) ?
        '<h3>Company Description</h3><p>' + mentorDict.companyDescription.content + '</p>' :
        '<span class="companyDescription d-none hidden visually-hidden">No company description entered</span>';




    /***
    *  Employment History
    * 
    * */
    let employmentHistoryString = (mentorDict.employmentHistory.content) ?
       '<h3>Employment History</h3><p>' + mentorDict.employmentHistory.content + '</p>' :
       '<span class="employmentHistory d-none hidden visually-hidden">No employment history entered</span>';




    /***
    *  Education
    * 
    * */
    let educationString = (mentorDict.education.content) ?
            '<h3>Education</h3><p>' + mentorDict.education.content + '</p>' :
            '<span class="education d-none hidden visually-hidden">No education entered</span>';




    /***
    *  Civic Involvement
    * 
    * */
    let civicInvolvementString = (mentorDict.civicInvolvement.content) ?
            '<h3>Civic Involvement</h3><p>' + mentorDict.civicInvolvement.content + '</p>' :
            '<span class="civicInvolvement d-none hidden visually-hidden">No civic involvement entered</span>';




    /***
    *  Mentoring Objectives
    * 
    * */
    let objectivesString = (mentorDict.objectives.content) ?
            '<h3>Mentoring Objectives & Scope</h3><p>' + mentorDict.objectives.content + '</p>' :
            '<span class="objectives d-none hidden visually-hidden">No objectives entered</span>';




    /***
    *  Your Meetings
    * 
    * */
    let yourMeetingsString = (mentorDict.yourMeetings.content) ?
            '<h3>When and where do you hold meetings with your students?</h3><p>' + mentorDict.yourMeetings.content + '</p>' :
            (mentorDict.whenAndWhere.content) ?
            '<h3>When and where do you hold meetings with your students?</h3><p>' + mentorDict.whenAndWhere.content + '</p>' :
            '<span class="yourMeetings d-none hidden visually-hidden">No meetings info entered</span>';
















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
           companyString,
           industryString,
           mentorSinceString,
           studentTypeString,
           linkedInString,
           closeSummary,
           closeSummaryWrapper,
           background,
           jobDescriptionString,
           companyDescriptionString,
           employmentHistoryString,
           educationString,
           civicInvolvementString,
           objectivesString,
           yourMeetingsString,

           closeArticle,
           endingHTML
       ]
   );
 
 
   
 
 } catch (err) {
   document.write(err.message);
 }
 