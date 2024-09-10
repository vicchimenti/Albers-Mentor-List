try {
    //Defining main functions
    function processTags(t4Tag) {
        myContent = content || null;
        return String(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, myContent, language, isPreview, t4Tag));
    }

    var photoid = processTags('<t4 type="content" name="Image ID" output="normal" modifiers="striptags,htmlentities" />');

    var list = {};
    list['articleTitle'] = processTags('<t4 type="content" name="Article Title" output="normal" modifiers="striptags,htmlentities" />');
    list['contentID'] = processTags('<t4 type="meta" meta="content_id" />');
    list['firstName'] = processTags('<t4 type="content" name="First Name" output="normal" modifiers="striptags,htmlentities" />');
    list['lastName'] = processTags('<t4 type="content" name="Last Name" output="normal" modifiers="striptags,htmlentities" />');
    list['jobTitle'] = processTags('<t4 type="content" name="Job Title" output="normal" modifiers="striptags,htmlentities" />');
    list['company'] = processTags('<t4 type="content" name="Company" output="normal" modifiers="striptags,htmlentities" />');
    list['industry'] = processTags('<t4 type="content" name="Industry" output="normal" modifiers="striptags,htmlentities" />');
    list['mentorSince'] = processTags('<t4 type="content" name="Mentor Since" output="normal" modifiers="striptags,htmlentities" />');
    list['mentorType'] = processTags('<t4 type="content" name="Mentor Type" output="normal" display_field="value" />').replace(/,\s*/g, '|').replace(/\//g, ', ');
    list['studentType'] = processTags('<t4 type="content" name="Mentee Type" output="normal" display_field="value" />').replace(/,\s*/g, '|').replace(/\//g, ', ');
    list['photoUrl'] = processTags('<t4 type="media" id="' + photoid + '" formatter="path/*" />');
    list['photoAlt'] = processTags('<t4 type="media" id="' + photoid + '" formatter="image/description" />');
    list['link'] = processTags('<t4 type="content" name="Article Title" output="fulltext" use-element="true" filename-element="Article Title" modifiers="striptags,htmlentities" />');

    var jsonObj = new org.json.JSONObject(list);
    document.write(jsonObj.toString() + ',');
} catch (err) {
    document.write(err);
}